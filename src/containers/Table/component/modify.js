import React, { Component } from "react";

import { Form, Select, Input, Button } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, age } = this.props.data;
    return (
      <div>
        <Form>
          <FormItem
            label="姓名"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入姓名" }],
              initialValue: name
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            label="年龄"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("age", {
              rules: [{ required: true, message: "请输入年龄" }],
              initialValue: age
            })(<Input disabled />)}
          </FormItem>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Modify);
