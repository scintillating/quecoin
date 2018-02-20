import { WEB3_INITIALIZED } from "./actions";

const initialState = {
  web3: null
};

const reducer = (state = initialState, action) => {
  if (action.type === WEB3_INITIALIZED) {
    return Object.assign({}, state, {
      web3: action.payload
    });
  }

  return state;
};

export default reducer;
