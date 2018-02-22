import { Dispatch, Action } from "redux";
import QuestionApi from "../util/QuestionApi";

export const CONTRACTS_INITIALIZED = "WEB3_INITIALIZED";
export function contractsInitialized(api) {
  return {
    type: CONTRACTS_INITIALIZED,
    payload: api
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
