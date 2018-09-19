import React, { Component } from "react";
import {
  // HashRouter as Router,
  // BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from "react-router-dom";
import Router from "../utils/router";

import Loadable from "react-loadable";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { loginAction } from "./action";

const Login = Loadable({
  loader: () => import(/* webpackChunkName: "login" */ "./Login"),
  loading: () => <div>Loading...</div>
});

const Main = Loadable({
  loader: () => import(/* webpackChunkName: "Main" */ "./Main"),
  loading: () => <div>Loading...</div>
});

import fakeAuth from "../utils/Auth";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          {/* <Route exact path="/" component={Home} /> */}
          <Route path="/about" component={() => <div>about</div>} />
          <PrivateRoute path="/" component={Main} {...this.props} />
          {/* <Route component={NoMatch} /> */}
          {/* <Redirect to={{ pathname: "/" }} /> */}
        </Switch>
      </Router>
    );
  }
}

// const fakeAuth = {
//   isAuthenticated: sessionStorage.getItem("token"),
//   authenticate(cb) {
//     sessionStorage.setItem("token", "token");
//     this.isAuthenticated = true;
//     setTimeout(cb, 100); // fake async
//   },
//   signout(cb) {
//     sessionStorage.removeItem("token");
//     this.isAuthenticated = false;
//     setTimeout(cb, 100);
//   }
// };

class PrivateRoute extends Component {
  render() {
    const { component: Component, token, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={props =>
          token ? (
            <Component {...props} />
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: props.location }
              }}
            />
          )
        }
      />
    );
  }
}

// class Login extends React.Component {
//   state = {
//     redirectToReferrer: false
//   };

//   login = () => {
//     fakeAuth.authenticate(() => {
//       this.setState({ redirectToReferrer: true });
//     });
//   };

//   render() {
//     const { from } = this.props.location.state || { from: { pathname: "/" } };
//     const { redirectToReferrer } = this.state;

//     if (redirectToReferrer) {
//       return <Redirect to={from} />;
//     }

//     return (
//       <div>
//         <p>You must log in to view the page at {from.pathname}</p>
//         <button onClick={this.login}>Log in</button>
//       </div>
//     );
//   }
// }

// const NoMatch = ({ location }) => (
//   <div>
//     <h3>
//       No match for <code>{location.pathname}</code>
//     </h3>
//   </div>
// );

const mapStateToProps = state => ({
  token: state.loginReducer.token
});

// const mapDispatchToProps = dispatch => ({
//   // loginAction: bindActionCreators(loginAction, dispatch)
// });

export default connect(
  mapStateToProps
  // mapDispatchToProps
)(App);
