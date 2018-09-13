import React from "react";
import { HashRouter as Router, Redirect } from "react-router-dom";
import "./style";

import fakeAuth from "../../utils/Auth";
class Login extends React.Component {
  state = {
    redirectToReferrer: false
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true });
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;

    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login">
        <div className="login-form">
          <p>You must log in to view the page at {from.pathname}</p>
          <button onClick={this.login}>Login</button>
        </div>
      </div>
    );
  }
}

export default Login;
