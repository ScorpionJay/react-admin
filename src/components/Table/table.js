import React, { Component } from "react";
import { Table, Pagination } from "antd";

class TableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        <Table
          columns={this.props.columns}
          dataSource={this.props.dataSource}
          pagination={false}
          title={this.props.header}
          rowKey={record => record.id}
          footer={() => (
            <div style={{ textAlign: "center" }}>
              <Pagination
                current={this.props.current}
                showQuickJumper
                bordered
                total={this.props.total}
                showTotal={(total, range) =>
                  `${range[0]}-${range[1]} 总共${total}条`
                }
                hideOnSinglePage={true}
                onChange={page => this.props.onChangePage(page)}
                showSizeChanger={true}
                onShowSizeChange={(current, size) =>
                  this.props.onChangePageSize(current, size)
                }
              />
            </div>
          )}
        />
      </div>
    );
  }
}

export default TableComponent;
