import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import web3Reducer from "./web3/reducer";

const reducer = combineReducers({
  routing: routerReducer,
  web3: web3Reducer
});

export default reducer;
