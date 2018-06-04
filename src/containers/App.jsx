import React, { Component } from "react";
import { Provider } from "react-redux";
import Main from "./main";
import store from "../store";
import { hot } from 'react-hot-loader'

const App = () => (
  <Provider store={store()}>
    <Main />
  </Provider>
);

export default hot(module)(App)

