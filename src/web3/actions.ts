import { Dispatch, Action } from "redux";
import QuestionApi from "../util/QuestionApi";
import getWeb3 from "../util/getWeb3";

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
