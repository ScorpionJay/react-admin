/**
 * music demo
 */

import React, { Component } from "react";

import Table from "../../component/Table/table";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getListAction, pageAction } from "./action";

import { Input, Button, Modal } from "antd";
import Modify from "./component/modify";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      visible: 0, //0隐藏、 1查看 2修改 3新增
      title: "",
      vo: null
    };
  }

  componentDidMount() {
    this.props.getListAction({
      page: 1,
      pageSize: this.props.data.pageSize
    });
  }

  columns = [
    // {
    //     title: "ID",
    //     key: 'id',
    //     dataIndex: 'id'
    // },
    {
      title: "Name",
      key: "name",
      dataIndex: "name"
    },
    {
      title: "Artist",
      key: "artist",
      render: (text, record) => (
        <span>{record.artist.map(item => item.name).join("、")}</span>
      )
    },
    {
      title: "Operation",
      key: "opt",
      dataIndex: "opt",
      width: "25%",
      render: (text, record) => (
        <span>
          <Button onClick={() => this.onView(record)}>查看</Button>
          <Button onClick={() => this.onModify(record)}>修改</Button>
          <Button onClick={() => console.log("delete.....")}>删除</Button>
        </span>
      )
    }
  ];

  onChangePage = page => {
    const { pageSize, keyword } = this.props.data;
    this.props.pageAction({ page, pageSize, keyword });
  };

  onChangePageSize = (current, pageSize) => {
    const { keyword } = this.props.data;
    this.props.pageAction({ page: 1, pageSize, keyword });
  };

  onSearch = () => {
    this.props.getListAction({
      page: 1,
      pageSize: this.props.data.pageSize,
      keyword: this.state.keyword
    });
  };

  onView = vo => {
    this.setState({
      visible: 1,
      title: "查看",
      vo
    });
  };

  onModify = vo => {
    this.setState({
      visible: 2,
      title: "修改",
      vo
    });
  };

  header = () => (
    <div>
      <Input
        placeholder="请输入姓名"
        style={{ width: "10rem", marginRight: "1rem" }}
        value={this.state.keyword}
        ref={el => (this.inputName = el)}
        onChange={() => this.setState({ keyword: this.inputName.input.value })}
        onPressEnter={this.onSearch}
      />
      <Button type="primary" icon="search" onClick={this.onSearch}>
        搜索
      </Button>
    </div>
  );

  render() {
    const { list: dataSource, total, page } = this.props.data;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={dataSource}
          current={page}
          total={total}
          onChangePage={this.onChangePage}
          onChangePageSize={this.onChangePageSize}
          header={this.header}
        />
        {
          // this.state.visible &&
          <Modal
            title={this.state.title}
            visible={this.state.visible !== 0}
            maskClosable={false}
            destroyOnClose={true}
            keyboard={false}
            width={800}
            footer={null}
            //onOk={this.handleOk}
            onCancel={() => this.setState({ visible: 0 })}
          >
            <Modify
              data={this.state.vo}
              isEdit={true}
              onCancle={() => this.setState({ visible: 0 })}
            />
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.tableReducer
});

const mapDispatchToProps = dispatch => ({
  getListAction: bindActionCreators(getListAction, dispatch),
  pageAction: bindActionCreators(pageAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
