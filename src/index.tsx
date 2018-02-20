///<reference path="index.d.ts"/>

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import getWeb3 from "./util/getWeb3";
import { web3Initialized } from "./web3/actions";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createHashHistory } from "history";
import { ConnectedRouter } from "react-router-redux";

import reducer from "./reducer";

// Layouts
import App from "./App";

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
    const web3 = await getWeb3;
    console.log("Web3 initialized!");
    store.dispatch(web3Initialized(web3));
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
