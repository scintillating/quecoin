import {
  INITIALIZE_CONTRACTS,
  LOAD_QUESTIONS,
  LOAD_QUE_BALANCES
} from "./actions";

const initialState = {
  api: null,
  questions: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_CONTRACTS:
      return Object.assign({}, state, {
        api: action.payload
      });
    case LOAD_QUESTIONS:
      return Object.assign({}, state, {
        questions: action.payload
      });
    case LOAD_QUE_BALANCES:
      return Object.assign({}, state, {
        authorization: action.payload.authorization,
        balance: action.payload.balance
      });
    default:
      return state;
  }
};

export default reducer;
