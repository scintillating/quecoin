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
        uint32 votePool;
        uint32 questionPool;
        uint32 totalUpvotes;
        uint32 totalDownvotes;
        bool finalized;
    }

    // User address -> questionId -> vote
    mapping (address => mapping(uint => int32)) private userToQuestionVote;
    mapping (uint => Answer[]) private answers;
    mapping (uint => address[]) private questionUpvoters;
    mapping (uint => address[]) private questionDownvoters;

    struct Answer {
        string answer;
        address author;
    }

    Question[] private questions;

    Quecoin private quecoin;

    function QuestionStore(address initialQuecoinAddress) public {
        changeQuecoinAddress(initialQuecoinAddress);
    }

    function askQuestion(string _question, string _description) external {
        // Initialize question with 0 vote and question pools
        Question storage newQuestion = Question(_question, _description, msg.sender, now, 0, 0, 0);
        _requireQuestionPoolPayment(newQuestion, _queAmount(10));
        questions.push(newQuestion);
    }

    function questionDetails(string _questionId) view external returns (string question, string desc, address asker, uint created, uint32 votePool, uint32 questionPool, uint32 totalUpvotes, uint32 totalDownvotes, address[] upvoters, address[] downvoters, bool finalized){
        Question storage question = questions[_questionId]

        question = question.question;
        desc = question.desc;
        asker = question.asker;
        created = question.created;
        votePool = question.votePool;
        questionPool = question.questionPool;
        totalUpvotes = question.totalUpvotes;
        totalDownvotes = question.totalDownvotes;
        upvoters = question.upvoters;
        downvoters = question.downvoters;
        finalized = question.finalized;

        return
    }

    // Called by asker
    function finalizeWithAnswer(uint _questionId, uint _answerId) external {
        Question storage q = questions[_questionId];
        require(q.asker == msg.sender); // Only asker can finalize question
        require(_isQuestionFinalizable(q));
        require(q.finalized == false);
        require(_voteScore(q) >= 0);

        // Quecoins sent to the final answerer
        Answer storage questionAnswer = answers[_questionId][_answerId];
        address answerer = questionAnswer.author;
        uint coinsForAnswerer = 3 * q.questionPool / 4;
        require(quecoin.transferFrom(this, answerer, coinsForAnswerer));

        // Quecoins sent to the asker
        uint coinsForAsker = q.questionPool / 4;
        require(quecoin.transferFrom(this, q.asker, coinsForAsker));

        // Voting quecoin pool
        if (_voteScore(q) > 0) {
            // Upvoters get their money back and downvoters' money proportional
            // the amount they put in
            // TODO: Unbounded for loops are bad in solidity
            for (uint i = 0; i < questionUpvoters[_questionId].length; i++) {
                address upvoter = questionUpvoters[_questionId][i];
                uint32 upvoteAmount = userToQuestionVote[upvoter][_questionId];
                uint payout = (upvoteAmount / q.totalUpvotes) * q.votePool;
                require(quecoin.transferFrom(this, upvoter, payout));
            }
        } else {
            // Downvoters
        }


        q.finalized = true;
    }

    // Called by anyone
    function finalizeFlagQuestion() external {

    }

    // 1 vote corresponds with 1 QUE
    function vote(uint _questionId, int32 _vote) external {
        require(userToQuestionVote[msg.sender][_questionId] == 0); // Never voted before
        require(_vote != 0); // No empty votes please
        Question storage q = questions[_questionId];
        _requireVotePoolPayment(q, _queAmount(_vote));
        userToQuestionVote[msg.sender][_questionId] += _vote;
        if (_vote > 0) {
            questionUpvoters[_questionId].push(msg.sender);
            q.totalUpvotes += _vote;
        } else {
            questionDownvoters[_questionId].push(msg.sender);
            q.totalDownvotes -= _vote;
        }
    }

    function getVote() external view returns (int32) {
        return userToQuestionVote[msg.sender][_questionId];
    }

    function changeQuecoinAddress(address _newAddress) public onlyOwner {
        quecoin = Quecoin(_newAddress);
    }

    function answerQuestion(uint _questionIndex, string _answer) {
        _requireQuestionPoolPayment(questions[_questionIndex], _queAmount(5));
        answers[_questionIndex].push(_answer);
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

    function _voteScore(Question _question) private pure returns (int32) {
        return _question.totalUpvotes - _question.totalDownvotes;
    }
}

/* welcome back young padawan

Requirements
- Ask Question (cost: 5 QUE)
- Get Question
- Add answer to question
- Get answers of question */
