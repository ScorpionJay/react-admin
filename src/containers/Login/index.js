/*
 * @Author: jay
 * @Date: 2018-11-13 17:01:37
 * @Last Modified by:   jay
 * @Last Modified time: 2018-11-13 17:01:37
 */

import React from "react";
import { Redirect } from "react-router-dom";
import { Form, Icon, Input, Button } from "antd";
const FormItem = Form.Item;
import "./style";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { loginAction } from "./action";

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
    console.log("xxxxxxxxxx", this.props.location);

    //const from = this.props.location.pathname;
    const { from } = this.props.location.state || {
      from: { pathname: "/a/b/" }
    };
    const { redirectToReferrer } = this.state;
    const { getFieldDecorator } = this.props.form;
    console.log("ffffff", from);
    if (redirectToReferrer) {
      return <Redirect to={from} />;
    }

    return (
      <div className="login">
        <div className="login-form">
          <div className="title">Admin</div>
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
