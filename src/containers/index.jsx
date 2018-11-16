/*
 * @Author: jay
 * @Date: 2018-11-13 17:00:20
 * @Last Modified by: jay
 * @Last Modified time: 2018-11-16 22:29:09
 */

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
            path={"/:first"}
            render={({ match }) => {
              // console.log("====================================");
              // // console.log(props.match.params.first);
              // const { first } = match.params;
              // console.log("%c first", "color:green", first);
              // sessionStorage.setItem("first", first);
              // console.log("====================================");
              return (
                <Switch>
                  <Route
                    path={`${match.url}/:second`}
                    render={({ match }) => {
                      // console.log("====================================");
                      // // console.log(props.match.params.first);
                      // // console.log(match);
                      // const { second } = match.params;
                      // console.log("%c second", "color:yellow", second);
                      // sessionStorage.setItem("second", second);
                      // console.log("====================================");
                      return (
                        <Switch>
                          <Route
                            exact
                            path={`${match.url}/login`}
                            component={Login}
                          />
                          <Route
                            path={`${match.url}/about`}
                            component={() => <div>about</div>}
                          />
                          <PrivateRoute
                            path={`${match.url}/`}
                            component={Main}
                            {...this.props}
                          />
                        </Switch>
                      );
                    }}
                  />
                  <Route
                    component={() => (
                      <div className="check_url">
                        Plese check your url ! No second param
                      </div>
                    )}
                  />
                </Switch>
              );
            }}
          />
          <Route
            component={() => (
              <div className="check_url">
                Plese check your url ! No first param
              </div>
            )}
          />
        </Switch>
      </Router>
    );
  }
}

class PrivateRoute extends Component {
  render() {
    const { component: Component, token, ...rest } = this.props;

    // console.log("PrivateRoute", this.props.location);

    const url = this.props.location.pathname.split("/");
    const pre = `/${url[1]}/${url[2]}`;
    // console.log("====================================");
    // console.log("match", this.props.path);
    // console.log("====================================");

    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: pre + "/login",
                // pathname: this.props.path + "/login",
                state: { from: props.location }
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
