/*
 * @Author: jay
 * @Date: 2018-11-13 17:01:13
 * @Last Modified by: jay
 * @Last Modified time: 2018-11-15 10:32:12
 */

import React from "react";
import { Provider } from "react-redux";
import Main from ".";
import store from "../store";
import { hot } from "react-hot-loader";

import "../styles";

const App = () => (
  <Provider store={store()}>
    <Main />
  </Provider>
);

export default hot(module)(App);

// test  es7 Decorator
import log from "Utils/log";

class Math {
  @log
  add(a, b) {
    return a + b;
  }
}

const math = new Math();

// Calling add with [2, 4]
math.add(2, 4);
