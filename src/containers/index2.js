import "./style.scss";

import React, { Component } from "react";
import { render } from "react-dom";

class Welcome extends React.Component {
  render() {
    return (
      <h1>
        Hello, {this.props.name}!
        <TableComponent />
      </h1>
    );
  }
}

class TableComponent extends Component {
  constructor(pros) {
    super(pros);

    this.columns = [
      {
        title: "歌名",
        dataIndex: "name",
        key: "name",
        width: "30%"
      },
      {
        title: "歌手",
        dataIndex: "signer",
        key: "signer",
        width: "30%"
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (text, record) => (
          <div>
            <Button>修改</Button>
            <Popconfirm
              title="确认删除"
              onConfirm={() => this.fnDelete(record.key)}
              okText="确定"
              cancelText="取消"
            >
              <Button>删除</Button>
              {/* <Button onClick={ ()=>this.fnDelete(record.key) } >删除</Button> */}
            </Popconfirm>
          </div>
        )
      }
    ];

    this.state = {
      dataSource: [
        {
          key: "1",
          name: "See you again",
          signer: "S"
        },
        {
          key: "2",
          name: "Numb",
          signer: "Linker park"
        },
        {
          key: "3",
          name: "I just wanna run",
          signer: "The Downtown Fiction"
        }
      ]
    };
  }

  fnAdd() {
    const { dataSource } = this.state;
    const newData = {
      key: dataSource.length + 10,
      name: `Edward King`,
      age: 32,
      address: `London, Park Lane no.`
    };
    this.setState({
      dataSource: [...dataSource, newData]
    });
  }

  fnDelete(key) {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  render() {
    return (
      <div>
        <Button onClick={() => this.fnAdd()}>新增</Button>
        <Table
          dataSource={this.state.dataSource}
          columns={this.columns}
          bordered
          pagination={false}
        />
      </div>
    );
  }
}

import { Button, Table, Popconfirm } from "antd";
import "antd/dist/antd.css"; // 这里为什么还需要自己引入

render(<Welcome name="react" />, document.getElementById("root"));
