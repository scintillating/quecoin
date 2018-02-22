import { INITIALIZE_CONTRACTS, LOAD_QUESTIONS } from "./actions";

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
    default:
      return initialState;
  }
};

export default reducer;
