import React, { Component } from "react";
import "./style";
class Login extends Component {
  render() {
    return (
      <div className="login">
        login form
        <button onClick={() => console.log("login")}>login</button>
      </div>
    );
  }
}

export default Login;
