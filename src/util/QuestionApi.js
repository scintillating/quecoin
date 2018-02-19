import QuecoinContract from '../../build/contracts/Quecoin.json'
import QuestionStoreContract from '../../build/contracts/QuestionStore.json'
import contract from 'truffle-contract'


function parseQuestionArray(arr) {
    return {
        question: arr[0],
        desc: arr[1],
        asker: arr[2],
        created: new Date(arr[3].toNumber() * 1000),
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

    waitForTransaction(txnHash, interval) {
        var transactionReceiptAsync;
        interval = interval ? interval : 500;
        transactionReceiptAsync = (txnHash, resolve, reject) => {
            try {
                var receipt = this.web3.eth.getTransactionReceipt(txnHash);
                if (receipt == null) {
                    setTimeout(() => {
                        transactionReceiptAsync(txnHash, resolve, reject);
                    }, interval);
                } else {
                    resolve(receipt);
                }
            } catch(e) {
                reject(e);
            }
        };
    
        if (Array.isArray(txnHash)) {
            var promises = [];
            txnHash.forEach(function (oneTxHash) {
                promises.push(this.web3.eth.getTransactionReceiptMined(oneTxHash, interval));
            });
            return Promise.all(promises);
        } else {
            return new Promise(function (resolve, reject) {
                    transactionReceiptAsync(txnHash, resolve, reject);
                });
        }
    };

    async authorizeQue(number) {
        const decimals = (await this.quecoin.decimals.call()).toNumber();
        console.log("Asking for authorization of QUE", decimals, number);
        return await this.quecoin.approve.sendTransaction(this.questionStore.address, (number * 10 ** decimals).toString(), { from: this.web3.eth.accounts[0] });
    }

    async getQueBalance() {
        return await this.quecoin.balanceOf.call(this.web3.eth.accounts[0]);
    }

    async getQueAuthorization() {
        return await this.quecoin.allowance(this.web3.eth.accounts[0], this.questionStore.address);
    }

    async askQuestion(question, description) {
        try {
            const txHash = await this.questionStore.askQuestion.sendTransaction(
                question, description,
                { from: this.web3.eth.accounts[0] });
            console.log("waiting for transaction to be mined")
            await this.waitForTransaction(txHash)
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async getQuestions() {
        let questions = [];
        const questionCount = await this.questionStore.getQuestionCount.call();
        console.log("Got", questionCount.toNumber(), "questions");
        for (let i = 0; i < questionCount; i++) {
            console.log(`Getting question details for #${i}`);
            const arr = await this.questionStore.getQuestionDetails.call(i);
            questions.push(parseQuestionArray(arr));
            const answerCount = await this.questionStore.getQuestionAnswerCount(i);
            questions[i].answers = [];
            for (let j = 0; j < answerCount; j++) {
                const ansArr = await this.questionStore.getQuestionAnswer(i, j);
                console.log(ansArr);
                questions[i].answers.push({ answer: ansArr[0], author: ansArr[1] });
            }
        }
        console.log("Got all questions");
        console.log(questions);
        return questions;
    }

    async answerQuestion(questionId, answer) {
        try {
            const txHash = await this.questionStore.answerQuestion.sendTransaction(
                questionId, answer,
                { from: this.web3.eth.accounts[0] }
            )
            console.log("waiting for transaction to be mined")
            await this.waitForTransaction(txHash)
            return true;
        } catch (e) {
            console.error(e);
            return false;
        }
    }

    async finalizeQuestion(questionId, answerId) {

    }

}
