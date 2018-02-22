///<reference path="index.d.ts"/>
///<reference path="../node_modules/web3-typescript-typings/index.d.ts"/>

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import getWeb3 from "./util/getWeb3";
import Web3 from "web3";
import { contractsInitialized, loadQuestions } from "./web3/actions";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createHashHistory } from "history";
import { ConnectedRouter } from "react-router-redux";

import reducer from "./reducer";

// Layouts
import App from "./App";
import QuestionApi from "./util/QuestionApi";

// Initialize redux store
// Redux DevTools
const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const history = createHashHistory();
const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(thunkMiddleware, routerMiddleware(history)))
);

// Initialize web3 and set in Redux.
(async () => {
  try {
    const web3: Web3 = await getWeb3();
    const api = new QuestionApi();
    await api.init(web3);
    console.log("Contracts initialized!");
    api.printDebugInfo();
    store.dispatch(contractsInitialized(api));
    store.dispatch(loadQuestions());
  } catch (e) {
    console.log("Error in web3 initialization.");
  }
})();

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
