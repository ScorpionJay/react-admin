import React from "react";
import { Provider } from "react-redux";
import Main from ".";
import store from "../store";
import { hot } from "react-hot-loader";

import "../style";

const App = () => (
  <Provider store={store()}>
    <Main />
  </Provider>
);

export default hot(module)(App);
