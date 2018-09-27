import reducers from "../reducers";

import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { createLogger } from "redux-logger";
import Storage from "../utils/storage";

function store(initialState) {
  // from storage get token then set in redux
  const token = Storage.get("token");
  if (token) {
    initialState = Object.assign({}, initialState, { loginReducer: { token } });
  }

  let createStoreWithMiddleware;
  // judge env logger
  if (process.env.NODE_ENV === "production") {
    createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  } else {
    createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(
      createStore
    );
  }
  const store = createStoreWithMiddleware(reducers, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default store;
