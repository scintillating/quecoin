const QuecoinAbi = require("../../build/contracts/Quecoin.json");
const QuestionStoreAbi = require("../../build/contracts/QuestionStore.json");
import { Quecoin } from "../typechain/Quecoin";
import contract from "truffle-contract";
import { QuestionStore } from "../typechain/QuestionStore";

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
  quecoin: Quecoin;
  questionStore: QuestionStore;
  web3: any;

  async init(web3) {
    console.log("QuestionApi: init with web3", web3);
    this.web3 = web3;
    const truffleQuecoin = contract(QuecoinAbi);
    const truffleQuestionStore = contract(QuestionStoreAbi);
    truffleQuecoin.setProvider(web3.currentProvider);
    truffleQuestionStore.setProvider(web3.currentProvider);
    const quecoinAddress = (await truffleQuecoin.deployed()).address;
    const questionStoreAddress = (await truffleQuestionStore.deployed())
      .address;
    console.log("Quecoin:", quecoinAddress);
    console.log("QuestionStore:", questionStoreAddress);
    this.quecoin = new Quecoin(web3, quecoinAddress);
    this.questionStore = new QuestionStore(web3, questionStoreAddress);
  }

  waitForTransaction(txnHash, interval?: number) {
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
      } catch (e) {
        reject(e);
      }
    };

    if (Array.isArray(txnHash)) {
      var promises = [];
      txnHash.forEach(function(oneTxHash) {
        promises.push(
          this.web3.eth.getTransactionReceiptMined(oneTxHash, interval)
        );
      });
      return Promise.all(promises);
    } else {
      return new Promise(function(resolve, reject) {
        transactionReceiptAsync(txnHash, resolve, reject);
      });
    }
  }

  async authorizeQue(number) {
    const decimals = (await this.quecoin.decimals).toNumber();
    console.log("Asking for authorization of QUE", decimals, number);
    return await this.quecoin
      .approveTx(this.questionStore.address, number * 10 ** decimals)
      .send({ from: this.web3.eth.accounts[0] });
  }

  async getQueBalance() {
    return await this.quecoin.balanceOf.call(this.web3.eth.accounts[0]);
  }

  async getQueAuthorization() {
    return await this.quecoin.allowance(
      this.web3.eth.accounts[0],
      this.questionStore.address
    );
  }

  async askQuestion(question, description) {
    try {
      const txHash = await this.questionStore
        .askQuestionTx(question, description)
        .send({ from: this.web3.eth.accounts[0] });
      console.log("waiting for transaction to be mined");
      await this.waitForTransaction(txHash);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async getQuestions() {
    let questions = [];
    const questionCount = (await this.questionStore
      .getQuestionCount).toNumber();
    console.log("Got", questionCount, "questions");
    for (let i = 0; i < questionCount; i++) {
      console.log(`Getting question details for #${i}`);
      const arr = await this.questionStore.getQuestionDetails.call(i);
      questions.push(parseQuestionArray(arr));
      const answerCount = (await this.questionStore.getQuestionAnswerCount(
        i
      )).toNumber();
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
      const txHash = await this.questionStore
        .answerQuestionTx(questionId, answer)
        .send({ from: this.web3.eth.accounts[0] });
      console.log("waiting for transaction to be mined");
      await this.waitForTransaction(txHash);
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  async finalizeQuestion(questionId, answerId) {}
}
