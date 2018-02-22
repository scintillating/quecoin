import { SET_FATAL_ERROR } from "./actions";

const initialState = {
  fatalError: null
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FATAL_ERROR:
      return Object.assign({}, state, {
        fatalError: action.payload
      });
    default:
      return state;
  }
};

export default reducer;
