pragma solidity ^0.4.18;

import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./Quecoin.sol";


contract QuestionStore is Pausable {
    uint private constant QUESTION_ANSWERING_PERIOD = 5 days;

    struct Question {
        string question;
        string desc;
        address asker;
        uint created;
        uint votePool;
        uint questionPool;
        uint upvotesInVotePool;
        uint downvotesInVotePool;
        // In terms of QUE
        int voteScore;
        bool finalized;
    }

    struct Answer {
        string answer;
        address author;
    }

    event QuestionAsked(address asker, uint questionId);
    event QuestionAnswered(address asker, address answerer, uint questionId, uint answerId);
    event AcceptedAndFinalized(address asker, address answerer, uint questionId, uint answerId);
    event FlaggedAndFinalized(address asker, address finalizer, uint questionId);
    event Voted(address voter, uint questionId);

    // User address -> questionId -> vote amount (negative = downvote)
    mapping (address => mapping(uint => int)) private userToQuestionVote;
    mapping (uint => Answer[]) private answers;
    mapping (uint => address[]) private questionUpvoters;
    mapping (uint => address[]) private questionDownvoters;

    Question[] private questions;

    Quecoin private quecoin;

    function QuestionStore(address initialQuecoinAddress) public {
        require(initialQuecoinAddress != 0x0);
        changeQuecoinAddress(initialQuecoinAddress);
    }

    function askQuestion(string _question, string _description) external {
        // Initialize question with 0 vote and question pools
        Question memory newQuestion = Question(_question, _description, msg.sender, now, 0, 0, 0, 0, 0, false);
        _requireQuestionPoolPayment(newQuestion, _queAmount(10));
        uint id = questions.push(newQuestion) - 1;
        QuestionAsked(msg.sender, id);
    }

    function answerQuestion(uint _questionId, string _answer) external {
        _requireQuestionPoolPayment(questions[_questionId], _queAmount(5));
        uint id = answers[_questionId].push(Answer(_answer, msg.sender)) - 1;
        QuestionAnswered(questions[_questionId].asker, msg.sender, _questionId, id);
    }

    // Called by asker
    function acceptAnswerAndFinalize(uint _questionId, uint _answerId) external {
        Question storage q = questions[_questionId];
        require(q.asker == msg.sender); // Only asker can finalize question
        require(_isQuestionFinalizable(q));
        require(q.finalized == false);
        require(q.voteScore >= 0); // Only for good questions

        // Quecoins sent to the final answerer
        Answer storage questionAnswer = answers[_questionId][_answerId];
        address answerer = questionAnswer.author;
        uint coinsForAnswerer = 3 * q.questionPool / 4;
        require(quecoin.transferFrom(this, answerer, coinsForAnswerer));

        // Quecoins sent to the asker
        uint coinsForAsker = q.questionPool / 4;
        require(quecoin.transferFrom(this, q.asker, coinsForAsker));

        // Upvoters get their money back and downvoters' money proportional
        // the amount they put in
        // TODO: Unbounded for loops are bad in solidity
        for (uint i = 0; i < questionUpvoters[_questionId].length; i++) {
            address upvoter = questionUpvoters[_questionId][i];
            uint upvoteAmount = uint(userToQuestionVote[upvoter][_questionId]);
            uint payout = (upvoteAmount / q.upvotesInVotePool) * q.votePool;
            require(quecoin.transferFrom(this, upvoter, payout));
        }

        q.finalized = true;
        AcceptedAndFinalized(q.asker, answerer, _questionId, _answerId);
    }

    // Callable by anyone
    function flagAndFinalize(uint _questionId) external {
        Question storage q = questions[_questionId];
        require(_isQuestionFinalizable(q));
        require(q.finalized == false);
        require(q.voteScore < 0);

        // Question pool voided
        require(quecoin.transferFrom(this, 0, q.questionPool));

        // Voter pool sent to each downvoter
        for (uint i = 0; i < questionDownvoters[_questionId].length; i++) {
            address downvoter = questionDownvoters[_questionId][i];
            uint downvoteAmount = uint(-1 * userToQuestionVote[downvoter][_questionId]);
            uint payout = (downvoteAmount / q.downvotesInVotePool) * q.votePool;
            require(quecoin.transferFrom(this, downvoter, payout));
        }

        q.finalized = true;
        FlaggedAndFinalized(q.asker, msg.sender, _questionId);
        // muy bein esteban
    }

    // 1 vote corresponds with 1 QUE
    function vote(uint _questionId, int _vote) external {
        require(userToQuestionVote[msg.sender][_questionId] == 0); // Never voted before
        require(_vote != 0); // No empty votes please
        Question storage q = questions[_questionId];
        uint queCost = uint(_vote > 0 ? _vote : -_vote);
        _requireVotePoolPayment(q, queCost);
        userToQuestionVote[msg.sender][_questionId] += _vote;
        if (_vote > 0) {
            questionUpvoters[_questionId].push(msg.sender);
            q.upvotesInVotePool += queCost;
        } else {
            questionDownvoters[_questionId].push(msg.sender);
            q.downvotesInVotePool += queCost;
        }
        q.voteScore += _vote;
        Voted(msg.sender, _questionId);
    }

    function getQuestionDetails(uint _questionId) external view
    returns (
        string question,
        string desc,
        address asker,
        uint created,
        uint votePool,
        uint questionPool,
        int voteScore,
        uint upvotesInVotePool,
        uint downvotesInVotePool,
        bool finalized)
    {
        Question storage q = questions[_questionId];

        question = q.question;
        desc = q.desc;
        asker = q.asker;
        created = q.created;
        votePool = q.votePool;
        questionPool = q.questionPool;
        voteScore = q.voteScore;
        upvotesInVotePool = q.upvotesInVotePool;
        downvotesInVotePool = q.downvotesInVotePool;
        finalized = q.finalized;
        // return (question, desc, asker, created, votePool, questionPool, upvotesInVotePool, downvotesInVotePool, finalized);
    }

    function getVote(uint _questionId) external view returns (int) {
        return userToQuestionVote[msg.sender][_questionId];
    }

    function changeQuecoinAddress(address _newAddress) public onlyOwner {
        quecoin = Quecoin(_newAddress);
    }

    function _requireQuestionPoolPayment(Question _question, uint _amount) private {
        _requireQuePayment(_amount);
        _question.questionPool += _amount;
    }

    function _requireVotePoolPayment(Question _question, uint _amount) private {
        _requireQuePayment(_amount);
        _question.votePool += _amount;
    }

    function _requireQuePayment(uint _amount) private {
        require(quecoin.transferFrom(msg.sender, this, _amount));
    }

    function _queAmount(uint _que) private view returns (uint) {
        return _que * (10 ** uint256(quecoin.decimals()));
    }

    function _isQuestionFinalizable(Question _question) private view returns (bool) {
        // Only allow finalize five days after
        return _question.created <= now - QUESTION_ANSWERING_PERIOD;
    }
}

/* welcome back young padawan

Requirements
- Ask Question (cost: 5 QUE)
- Get Question
- Add answer to question
- Get answers of question */
