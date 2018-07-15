import React, { Component } from "react";

import { Form, Select, Input, Button, Icon } from "antd";
const FormItem = Form.Item;
const Option = Select.Option;
import Upload from "../../../component/Upload";

import "./modify.scss";

class Modify extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);

        // callback
        this.props.onCancle();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      name,
      artist: artists,
      album: { picUrl, name: albumName },
      province
    } = this.props.data;

    const fileList = [
      {
        // uid: -1,
        // name: 'xxx.png',
        // status: 'done',
        // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
        // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
      }
    ];

    const props = {
      action: "//jsonplaceholder.typicode.com/posts/",
      listType: "picture",
      defaultFileList: [],
      className: "upload-list-inline",
      listType: "picture"
    };

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
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            label="Artist"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("artist", {
              rules: [{ required: true, message: "请输入年龄" }],
              initialValue: artists.map(item => item.name).join("、")
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            label="Album"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("album", {
              rules: [{ required: true, message: "请输入姓名" }],
              initialValue: albumName
            })(<Input disabled />)}
          </FormItem>
          <FormItem
            label="Picture"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 12 }}
          >
            {getFieldDecorator("picture", {
              initialValue: picUrl,
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
              // <img src={picUrl} width='80' height='80'/>
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
