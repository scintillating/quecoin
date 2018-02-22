import { Dispatch, Action } from "redux";

export const SET_FATAL_ERROR = "SET_FATAL_ERROR";
export function setFatalError(message: string) {
  return { type: SET_FATAL_ERROR, payload: message };
}
