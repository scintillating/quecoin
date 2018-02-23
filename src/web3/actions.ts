import { Dispatch, Action } from "redux";
import QuestionApi from "../util/QuestionApi";
import getWeb3 from "../util/getWeb3";
import { setFatalError } from "../error/actions";
import Question from "../data/Question";
import QUE from "../data/QUE";
import { BigNumber } from "bignumber.js";

// Where the work happens.
// Each action is async and kicks off some web3 transaction/call

export const INITIALIZE_CONTRACTS = "INITIALIZE_CONTRACTS";
export function initializeContracts() {
  return async (dispatch: Dispatch<Action>, getState) => {
    const api = new QuestionApi();
    await api.init(await getWeb3());
    dispatch({ type: INITIALIZE_CONTRACTS, payload: api });
  };
}

export const LOAD_QUESTIONS = "LOAD_QUESTIONS";
export function loadQuestions() {
  return async (dispatch: Dispatch<Action>, getState) => {
    const api: QuestionApi = getState().web3.api;
    dispatch({ type: LOAD_QUESTIONS, payload: await api.getQuestions() });
  };
}

export const LOAD_QUE_BALANCES = "LOAD_QUE_BALANCES";
export function loadQueBalances() {
  return async (dispatch: Dispatch<Action>, getState) => {
    const api: QuestionApi = getState().web3.api;
    dispatch({
      type: LOAD_QUE_BALANCES,
      payload: {
        authorization: await api.getQueAuthorization(),
        balance: await api.getQueBalance()
      }
    });
  };
}

export function watchForChainEvents() {
  return async (dispatch: Dispatch<Action>, getState) => {
    const api: QuestionApi = getState().web3.api;
    api.watchQuestionAsked((err, res) => {
      if (err) {
        dispatch(setFatalError(err.message));
      } else {
        dispatch(loadQuestions());
      }
    });
    api.watchQueAuthorization((err, res) => {
      if (err) {
        dispatch(setFatalError(err.message));
      } else {
        dispatch(loadQueBalances());
      }
    });
  };
}

export function authorizeQue(amount) {
  return async (dispatch: Dispatch<Action>, getState) => {
    const api: QuestionApi = getState().web3.api;
    await api.authorizeQue(QUE.fromAmount(new BigNumber(amount)));
  };
}

export function answerQuestion(questionId, answer) {
  return async (dispatch: Dispatch<Action>, getState) => {
    const api: QuestionApi = getState().web3.api;
    await api.answerQuestion(questionId, answer);
  };
}

export function askQuestion(text) {
  return async (dispatch: Dispatch<Action>, getState) => {
    const api: QuestionApi = getState().web3.api;
    await api.askQuestion(text, "");
  };
}
