/**
 * login
 */

import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
const FormItem = Form.Item;
import "./style";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "./action";

import fakeAuth from "../../utils/Auth";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: props.token || false
    };
  }

  login = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        await this.props.loginAction(values);
        this.setState({ redirectToReferrer: true });
      }
    });
  };

  render() {
    const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { redirectToReferrer } = this.state;
    const { getFieldDecorator } = this.props.form;
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login">
        <div className="login-form">
          <div className="title">React</div>
          <Form onSubmit={this.login} className="login-form">
            <FormItem>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
                />
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator("password", {
                rules: [
                  { required: true, message: "Please input your Password!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              )}
            </FormItem>
            <FormItem>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Log in
              </Button>
            </FormItem>
          </Form>
          {/* <p>You must log in to view the page at {from.pathname}</p> */}
          {/* <button onClick={this.login}>Login</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  token: state.loginReducer.token
});

const mapDispatchToProps = dispatch => ({
  loginAction: bindActionCreators(loginAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form.create()(Login));
