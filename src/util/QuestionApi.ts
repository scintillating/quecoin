///<reference path="../../node_modules/web3-typescript-typings/index.d.ts"/>
const QuecoinAbi = require("../../build/contracts/Quecoin.json");
const QuestionStoreAbi = require("../../build/contracts/QuestionStore.json");
import Web3 from "web3";
import { Quecoin } from "../typechain/Quecoin";
import contract from "truffle-contract";
import { QuestionStore } from "../typechain/QuestionStore";
import TxFailedError from "./TxFailedError";

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
  web3: Web3;

  async init(web3: Web3) {
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

  waitForTransaction(txHash: string | string[], interval?: number) {
    interval = interval ? interval : 50;
    console.log("Waiting for txn with hash", txHash, "and interval", interval);
    const transactionReceiptAsync = async (txHash, resolve, reject) => {
      console.log("Getting receipt");
      this.web3.eth.getTransactionReceipt(txHash, (err, receipt) => {
        if (err) {
          reject(err);
        }

        if (receipt === null) {
          console.log("Waiting for transaction");
          setTimeout(() => {
            transactionReceiptAsync(txHash, resolve, reject);
          }, interval);
        } else if (receipt.status === 0) {
          // status 0 indicates a failed transaction
          reject(new TxFailedError("Failed transaction", txHash, receipt));
        } else {
          console.log("Got transaction receipt", receipt);
          console.log("Transaction successful!");
          resolve(receipt);
        }
      });
    };

    if (Array.isArray(txHash)) {
      return Promise.all(
        txHash.map(singleHash => this.waitForTransaction(singleHash))
      );
    } else {
      return new Promise((resolve, reject) => {
        transactionReceiptAsync(txHash, resolve, reject);
      });
    }
  }

  async printDebugInfo() {
    console.log("Printing debug info from API object", this);
    console.log("Contracts:", this.quecoin, this.questionStore);
    console.log("Account:", this.web3.eth.accounts[0]);
    console.log("QUE balance:", (await this.getQueBalance()).toString());
    console.log(
      "Que authorization:",
      (await this.getQueAuthorization()).toString()
    );
  }

  async authorizeQue(number) {
    const decimals = (await this.quecoin.decimals).toNumber();
    console.log(
      "Asking for authorization of QUE:",
      number,
      "* 10 **",
      decimals
    );
    const txHash = await this.quecoin
      .approveTx(this.questionStore.address, number * 10 ** decimals)
      .send({ from: this.web3.eth.accounts[0] });
    await this.waitForTransaction(txHash);
  }

  async getQueBalance() {
    return await this.quecoin.balanceOf(this.web3.eth.accounts[0]);
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
      const arr = await this.questionStore.getQuestionDetails(i);
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
