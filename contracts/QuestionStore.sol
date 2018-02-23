pragma solidity ^0.4.18;

import "./Quecoin.sol";
import "zeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "zeppelin-solidity/contracts/ownership/Ownable.sol";


/*
Requirements
- Ask Question (cost: 5 QUE)
- Get Question
- Add answer to question
- Get answers of question
*/

contract QuestionStore is Ownable, Pausable {
    using SafeMath for uint256;

    uint private constant QUESTION_ANSWERING_PERIOD = 7 days;

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

    // Maybe wrong?
    mapping (uint => uint) private questionScore;

    Question[] private questions;

    uint[10] private topTenScores;

    Quecoin private quecoin;

    function QuestionStore(address initialQuecoinAddress) public {
        require(initialQuecoinAddress != 0x0);
        changeQuecoinAddress(initialQuecoinAddress);
    }

    function askQuestion(string _question, string _description) external whenNotPaused {
        // Initialize question with 0 vote and question pools
        Question memory newQuestion = Question(_question, _description, msg.sender, now, 0, 0, 0, 0, 0, false);
        _requireQuestionPoolPayment(newQuestion, _queAmount(10));
        uint id = questions.push(newQuestion) - 1;
        QuestionAsked(msg.sender, id);
    }

    function answerQuestion(uint _questionId, string _answer) external whenNotPaused {
        _requireQuestionPoolPayment(questions[_questionId], _queAmount(5));
        uint id = answers[_questionId].push(Answer(_answer, msg.sender)) - 1;
        QuestionAnswered(questions[_questionId].asker, msg.sender, _questionId, id);
    }

    // By chriseth
    function quickSort(uint[] storage arr, uint left, uint right) internal {
        uint i = left;
        uint j = right;
        uint pivot = arr[left + (right - left) / 2];
        while (i <= j) {
            while (arr[i] < pivot) {i++;}
            while (pivot < arr[j]) {j--;}
            if (i <= j) {
                (arr[i], arr[j]) = (arr[j], arr[i]);
                i++;
                j--;
            }
        }
        if (left < j)
            quickSort(arr, left, j);
        if (i < right)
            quickSort(arr, i, right);
    }

    function sortTopTen() external whenNotPaused {
        uint[10] scores;

        for (uint x = 0; x < 10; x++) {
            uint score = questiontopTenScores[x];
            scores[score].push;
        }

        if (scores.length == 0) {
            return;
        } else {
            quickSort(scores, 0, scores.length - 1);
        }

    }

    // WIP Question Sort
    function hotQuestion(uint _questionId, uint _oldScore, uint _newScore) external whenNotPaused {
        uint oldScoreId = questionScore[_oldScore];
        if (oldScoreId == _questionId) {
            questionScore[_oldScore] = 0;
            questionScore[_newScore] = _questionId;
            sortTopTen();
        } else {
            topTenScores[_questionId].push;
            questionScore[_newScore] = _questionId;
            sortTopTen();
        }
    }

    // Called by asker
    function acceptAnswerAndFinalize(uint _questionId, uint _answerId) external whenNotPaused {
        Question storage q = questions[_questionId];
        require(q.asker == msg.sender); // Only asker can finalize question
        require(_isQuestionFinalizable(q));
        require(q.finalized == false);
        require(q.voteScore >= 0); // Only for good questions

        // Quecoins sent to the final answerer
        Answer storage questionAnswer = answers[_questionId][_answerId];
        address answerer = questionAnswer.author;
        uint coinsForAnswerer = q.questionPool.mul(3).div(4);
        require(quecoin.transferFrom(this, answerer, coinsForAnswerer));

        // Quecoins sent to the asker
        uint coinsForAsker = q.questionPool.div(4);
        require(quecoin.transferFrom(this, q.asker, coinsForAsker));

        // Upvoters get their money back and downvoters' money proportional
        // the amount they put in
        // TODO: Unbounded for loops are bad in solidity
        for (uint i = 0; i < questionUpvoters[_questionId].length; i++) {
            address upvoter = questionUpvoters[_questionId][i];
            uint upvoteAmount = uint(userToQuestionVote[upvoter][_questionId]);
            uint payout = upvoteAmount.div(q.upvotesInVotePool).mul(q.votePool);
            require(quecoin.transferFrom(this, upvoter, payout));
        }

        q.finalized = true;
        AcceptedAndFinalized(q.asker, answerer, _questionId, _answerId);
    }

    // Callable by anyone
    function flagAndFinalize(uint _questionId) external whenNotPaused {
        Question storage q = questions[_questionId];
        require(_isQuestionFinalizable(q));
        require(q.finalized == false);
        require(q.voteScore < 0);

        // Question pool voided
        require(quecoin.transferFrom(this, 0, q.questionPool));

        // Voter pool sent to each downvoter
        for (uint i = 0; i < questionDownvoters[_questionId].length; i++) {
            address downvoter = questionDownvoters[_questionId][i];
            uint downvoteAmount = uint(userToQuestionVote[downvoter][_questionId] * -1);
            uint payout = downvoteAmount.div(q.downvotesInVotePool).mul(q.votePool);
            require(quecoin.transferFrom(this, downvoter, payout));
        }

        q.finalized = true;
        FlaggedAndFinalized(q.asker, msg.sender, _questionId);
    }

    // 1 vote corresponds with 1 QUE
    function vote(uint _questionId, int _vote) external whenNotPaused {
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

    function abandonShip() external whenPaused onlyOwner {
        // TODO Return all funds
        // selfdestruct();
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

    function getQuestionCount() external view returns (uint) {
        return questions.length;
    }

    function getQuestionAnswerCount(uint _questionId) external view returns (uint) {
        return answers[_questionId].length;
    }

    function getQuestionAnswer(uint _questionId, uint _answerId) external view returns (string, address) {
        Answer storage answer = answers[_questionId][_answerId];
        return (answer.answer, answer.author);
    }

    function getQuestionFinalizable(uint _questionId) external view returns (bool) {
        Question storage q = questions[_questionId];
        return _isQuestionFinalizable(q);
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
        return _que.mul(10 ** uint256(quecoin.decimals()));
    }

    function _isQuestionFinalizable(Question _question) private view returns (bool) {
        // Only allow finalize seven days after
        return _question.created <= now - QUESTION_ANSWERING_PERIOD;
    }
}
