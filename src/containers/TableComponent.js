import React, { Component } from "react";
import { render } from "react-dom";
import { Button, Table, Popconfirm, Input } from "antd";

class TableComponent extends Component {
  constructor(pros) {
    super(pros);
    this.columns = [
      {
        title: "歌名",
        dataIndex: "name",
        key: "name",
        width: "30%",
        render: (text, record) => this.renderColumns(text, record, "name")
      },
      {
        title: "歌手",
        dataIndex: "signer",
        key: "signer",
        width: "30%",
        render: (text, record) => this.renderColumns(text, record, "signer")
      },
      {
        title: "操作",
        dataIndex: "operation",
        key: "operation",
        render: (text, record) => (
          <div>
            {record.editable ? (
              <span>
                <Button onClick={() => this.save(record.key)}>保存</Button>
                <Popconfirm
                  title="取消修改?"
                  onConfirm={() => this.cancel(record.key)}
                  okText="确认"
                  cancelText="取消"
                >
                  <Button>取消</Button>
                </Popconfirm>
              </span>
            ) : (
              <Button onClick={() => this.fnEdit(record.key)}>修改</Button>
            )}

            <Popconfirm
              title="确认删除"
              onConfirm={() => this.fnDelete(record.key)}
              okText="确定"
              cancelText="取消"
            >
              <Button>删除</Button>
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

    this.cacheData = this.state.dataSource.map(item => ({ ...item }));
  }

  renderColumns(text, record, column) {
    return (
      <EditableCell
        editable={record.editable}
        value={text}
        onChange={value => this.fnCellChange(value, record.key, column)}
      />
    );
  }

  /**
   * 新增
   */
  fnAdd() {
    const { dataSource } = this.state;
    const newData = {
      editable: true,
      key: ""
    };
    this.setState({
      dataSource: [...dataSource, newData]
    });
  }

  /**
   * 删除
   * @param {key} key
   */
  fnDelete(key) {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }

  /**
   * 编辑
   * @param {key} key
   */
  fnEdit(key) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target.editable = true;
      this.setState({ dataSource: newData });
    }
  }

  /**
   * 修改保存
   * @param {key} key
   */
  save(key) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      delete target.editable;
      this.setState({ data: newData });
      this.cacheData = newData.map(item => ({ ...item }));
    }
  }

  /**
   * 修改取消
   * @param {key} key
   */
  cancel(key) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      Object.assign(target, this.cacheData.filter(item => key === item.key)[0]);
      delete target.editable;
      this.setState({ dataSource: newData });
    }
  }

  /**
   * 列修改
   * @param {值} value
   * @param {key} key
   * @param {列名} column
   */
  fnCellChange(value, key, column) {
    const newData = [...this.state.dataSource];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
      target[column] = value;
      this.setState({ dataSource: newData });
    }
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



/**
 * 可编辑的单元格
 */
const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable ? (
      <Input
        style={{ margin: "-5px 0" }}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
    ) : (
      value
    )}
  </div>
);

export default TableComponent;
