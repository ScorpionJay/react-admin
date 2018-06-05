import React, { Component } from 'react'

import { Form, Select, Input, Button, Upload, Icon } from 'antd'
const FormItem = Form.Item
const Option = Select.Option

import './modify.scss'

class Modify extends Component {
  constructor (props) {
    super(props)
    this.state = {  }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);

        // callback
        this.props.onCancle();
      }
    });
  }

  render () {
    const { getFieldDecorator } = this.props.form
    const {name, age, picture, province} = this.props.data

    const fileList = [{
      // uid: -1,
      // name: 'xxx.png',
      // status: 'done',
      // url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      // thumbUrl: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    }]

    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType: 'picture',
      defaultFileList: [],
      className: 'upload-list-inline',
      listType: 'picture'
    }

    return <div>
             <Form onSubmit={this.handleSubmit}>
               <FormItem label='姓名' labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                 {getFieldDecorator('name', {
                    rules: [{ required: true, message: '请输入姓名' }],
                    initialValue: name
                  })(
                    <Input disabled />
                  )}
               </FormItem>
               <FormItem label='年龄' labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                 {getFieldDecorator('age', {
                    rules: [{ required: true, message: '请输入年龄' }],
                    initialValue: age
                  })(
                    <Input disabled />
                  )}
               </FormItem>
               <FormItem label='头像' labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                 {getFieldDecorator('picture', {
                    rules: [{ required: true, message: '请上传头像' }],
                    initialValue: age
                  })(
                    <Upload {...props}>
                      <Button>
                        <Icon type='upload' />上传
                      </Button>
                    </Upload>
                  )}
               </FormItem>
               <FormItem label='省份' labelCol={{ span: 5 }} wrapperCol={{ span: 12 }}>
                 {getFieldDecorator('province', {
                    // rules: [{ required: true, message: '请选择省份' }],
                    initialValue: province
                  })(
                    <Select style={{ width: 120 }} placeholder="选择省份" >
                      <Option value='北京'>
                        北京
                      </Option>
                      <Option value='上海'>
                        上海
                      </Option>
                      <Option value='深圳'>
                        深圳
                      </Option>
                    </Select>
                  )}
               </FormItem>
               <div style={{textAlign:'center'}}>
                  <Button style={{marginRight:'2rem'}} onClick={()=>this.props.onCancle()}>取消</Button>
                  <Button type="primary" htmlType="submit">确定</Button>
                </div>
             </Form>
           </div>
  }
}

export default Form.create()(Modify)
