/**
 * banner
 */

import React, { Component } from "react";
import Table from "../../component/Table/table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getBannerAction, addBannerAction, deleteBannerAction } from "./action";
import { Input, Button, Modal } from "antd";
import Modify from "./component/modify";

class TableContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: "",
      title: "",
      vo: null
    };
  }

  componentDidMount() {
    this.props.getBannerAction({
      // page: 1,
      // pageSize: this.props.data.pageSize
    });
  }

  columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      align: "center"
    },
    {
      title: "Image",
      key: "Image",
      render: (text, record) => <img src={record.img} width="50" height="50" />
    },
    // {
    //   title: "Artist",
    //   key: "artist",
    //   render: (text, record) => (
    //     <span>{record.artist.map(item => item.name).join("、")}</span>
    //   ),
    //   align:'center'
    // },
    {
      title: "Operation",
      key: "opt",
      dataIndex: "opt",
      align: "center",
      render: (text, record) => (
        <span>
          <Button onClick={() => this.onView(record)}>Look</Button>
          <Button onClick={() => this.onModify(record)}>Modify</Button>
          <Button onClick={() => this.props.deleteBannerAction(record.id)}>Delete</Button>
        </span>
      )
    }
  ];

  onChangePage = page => {
    const { pageSize, keyword } = this.props.data;
    this.props.getListAction({ page, pageSize, keyword });
  };

  onChangePageSize = (current, pageSize) => {
    const { keyword } = this.props.data;
    this.props.getListAction({ page: 1, pageSize, keyword });
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
      title: "View",
      vo
    });
  };

  onModify = vo => {
    this.setState({
      title: "Modify",
      vo
    });
  };

  onAdd = () => {
    this.setState({
      title: "Add",
      vo: {}
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
        Search
      </Button>
      <Button
        type="primary"
        icon="plus-circle-o"
        onClick={this.onAdd}
        style={{ marginLeft: "1rem" }}
      >
        Add
      </Button>
    </div>
  );

  render() {
    const { data: dataSource } = this.props;
    return (
      <div>
        <Table
          columns={this.columns}
          dataSource={dataSource}
          // current={page}
          // total={total}
          onChangePage={this.onChangePage}
          onChangePageSize={this.onChangePageSize}
          header={this.header}
        />
        {
          // this.state.visible &&
          <Modal
            title={this.state.title}
            visible={!!this.state.title}
            maskClosable={false}
            destroyOnClose={true}
            keyboard={false}
            width={800}
            footer={null}
            //onOk={this.handleOk}
            onCancel={() => this.setState({ title: "" })}
          >
            <Modify
              data={this.state.vo}
              isEdit={true}
              onCancle={() => this.setState({ title: "" })}
              onAdd={this.props.addBannerAction}
            />
          </Modal>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.bannerReducer.data
});

const mapDispatchToProps = dispatch => ({
  getBannerAction: bindActionCreators(getBannerAction, dispatch),
  addBannerAction: bindActionCreators(addBannerAction, dispatch),
  deleteBannerAction: bindActionCreators(deleteBannerAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableContainer);
