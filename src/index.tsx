///<reference path="index.d.ts"/>
///<reference path="../node_modules/web3-typescript-typings/index.d.ts"/>

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import {
  initializeContracts,
  loadQuestions,
  watchForChainEvents,
  authorizeQue
} from "./web3/actions";
import { setFatalError } from "./error/actions";
import { createStore, applyMiddleware, compose } from "redux";
import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "react-router-redux";
import { createHashHistory } from "history";
import { ConnectedRouter } from "react-router-redux";

import combinedReducers from "./reducer";

// Layouts
import App from "./App";

// Initialize redux store
// Redux DevTools
const composeEnhancers =
  window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"] || compose;
const history = createHashHistory();
const store = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware, routerMiddleware(history)))
);

// Start up app with data off the blockchain
(async () => {
  try {
    console.log("Quecoin starting up...");
    await store.dispatch(initializeContracts());
    await store.dispatch(authorizeQue(100));
    await store.dispatch(loadQuestions());
    await store.dispatch(watchForChainEvents());
    console.log("Contract load complete.");
  } catch (e) {
    console.error("Error in blockchain data load:", e);
    store.dispatch(
      setFatalError("While loading data from Ethereum contracts: " + e.message)
    );
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
