import React, { Component, lazy, Suspense } from "react";

import { Route, Redirect, Switch } from "react-router-dom";
import Router from "../utils/router";

import Loadable from "react-loadable";

import { connect } from "react-redux";

const Login = e => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OtherComponent {...e} />
    </Suspense>
  );
};

const Main = Loadable({
  loader: () => import(/* webpackChunkName: "Main" */ "./Main"),
  loading: () => <div>Loading...</div>
});

const OtherComponent = lazy(() =>
  import(/* webpackChunkName: "login" */ "./Login")
);

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path={"/*"}
            render={() => (
              <Switch>
                <Route exact path="/*/login" component={Login} />
                <Route path="/*/about" component={() => <div>about</div>} />
                <PrivateRoute path="/*" component={Main} {...this.props} />
                {/* <Redirect to={{ pathname: "/" }} /> */}
              </Switch>
            )}
          />
          <Route component={() => <div>no</div>} />
        </Switch>
      </Router>
    );
  }
}

class PrivateRoute extends Component {
  render() {
    const { component: Component, token, ...rest } = this.props;

    // 这里的token 获取处理
    console.log(this.props.location);


    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "a" + "/login",
                // state: { from: props.location }
                // state: { from: 'a/' }
              }}
            />
          )
        }
      />
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token
});

export default connect(mapStateToProps)(App);
