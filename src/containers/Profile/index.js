/*
 * @Author: jay
 * @Date: 2018-11-13 17:14:20
 * @Last Modified by: jay
 * @Last Modified time: 2018-11-14 12:31:34
 */

import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getListAction, pageAction } from "./action";

import Form from "./component/form";

import "./style";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.getListAction({
      page: 1,
      pageSize: this.props.data.pageSize
    });
  }

  render() {
    return (
      <div className="profile container">
        <h3 className="account_setting">Account setting</h3>
        <div className="account_form">
          <Form />
        </div>
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
)(Profile);
