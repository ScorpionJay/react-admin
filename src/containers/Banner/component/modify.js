import React, { Component } from "react";

import { Form, Select, Input, Button, Icon } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
import Upload from "../../../components/Upload";

import "./modify.scss";

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
        await this.props.onAdd(values);
        // callback
        this.props.onCancle();
      }
    });
  };

  getImgUrl = url => {
    this.setState({ imgUrl: url }, () => console.log(this.state));
  };

  normFile = e => {
    // console.log('Upload event:', e);
    // if (Array.isArray(e)) {
    //   return e;
    // }
    // return e && e.fileList;
    return e;
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { name, img, description, url } = this.props.data || {};

    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          <FormItem
            label="Name"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("name", {
              rules: [{ required: true, message: "请输入姓名" }],
              initialValue: name
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Description"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("description", {
              rules: [{ required: true, message: "please input description" }],
              initialValue: description
            })(<Input />)}
          </FormItem>
          <FormItem
            label="url"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("url", {
              rules: [{ required: true, message: "please input url" }],
              initialValue: url
            })(<Input />)}
          </FormItem>
          <FormItem
            label="Picture"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("img", {
              initialValue: img,
              // getValueProps: 'value',
              // valuePropName: 'value',
              rules: [{ required: true, message: "请上传图片" }]
              // getValueProps:'fileList'
              // getValueFromEvent:this.normFile
            })(
              <Upload
                type={"picture-card"} // picture picture-card
                onChange={e => e}
              />
            )}
          </FormItem>
          <div style={{ textAlign: "center" }}>
            <Button
              style={{ marginRight: "2rem" }}
              onClick={() => this.props.onCancle()}
            >
              取消
            </Button>
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </div>
        </Form>
      </div>
    );
  }
}

export default Form.create()(Modify);
