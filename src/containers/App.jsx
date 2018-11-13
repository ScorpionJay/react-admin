/*
 * @Author: jay
 * @Date: 2018-11-13 17:01:13
 * @Last Modified by:   jay
 * @Last Modified time: 2018-11-13 17:01:13
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
