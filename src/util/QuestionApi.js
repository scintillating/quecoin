import QuecoinContract from '../../build/contracts/Quecoin.json'
import QuestionStoreContract from '../../build/contracts/QuestionStore.json'
import contract from 'truffle-contract'


function parseQuestionArray(arr) {
    return {
        question: arr[0],
        desc: arr[1],
        asker: arr[2],
        created: arr[3],
        votePool: arr[4],
        questionPool: arr[5],
        voteScore: arr[6],
        upvotesInVotePool: arr[7],
        downvotesInVotePool: arr[8],
        finalized: arr[9]
    };
}

export default class QuestionApi {
    async init(web3) {
        this.web3 = web3;
        const Quecoin = contract(QuecoinContract);
        const QuestionStore = contract(QuestionStoreContract);
        Quecoin.setProvider(web3.currentProvider);
        QuestionStore.setProvider(web3.currentProvider);
        this.quecoin = await Quecoin.deployed();
        this.questionStore = await QuestionStore.deployed();
        console.log("Quecoin:", this.quecoin.address);
        console.log("QuestionStore:", this.questionStore.address);
    }

    getQueBalance(accountAddress) {
        var balance = this.quecoin.balanceOf(accountAddress).toNumber();
    }

    async getQuestions() {
        let questions = [];
        const questionCount = await this.questionStore.getQuestionCount.call();
        for (let i = 0; i < questionCount; i++) {
            console.log(`Getting question details for #${i}`);
            const arr = await this.questionStore.getQuestionDetails.call(i);
            questions.push(parseQuestionArray(arr));
        }
        return questions;
    }

    answerQuestion() {

    }

}
