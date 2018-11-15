/*
 * @Author: jay
 * @Date: 2018-11-13 17:14:20
 * @Last Modified by: jay
 * @Last Modified time: 2018-11-15 11:25:48
 */

import React, { Component } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getListAction, pageAction } from "./action";

import Slider from "./component/slider";
import Nav from "./component/nav";
import Recommend from "./component/recommend";
import Tool from "./component/tool";

const mapStateToProps = state => ({
  data: state.tableReducer
});

const mapDispatchToProps = dispatch => ({
  getListAction: bindActionCreators(getListAction, dispatch),
  pageAction: bindActionCreators(pageAction, dispatch)
});

export default
@connect(
  mapStateToProps,
  mapDispatchToProps
)
class App extends Component {
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
    // const { list: dataSource, total, page } = this.props.data;
    return (
      <div className="home">
        <Slider />
        <Nav />
        <Recommend />
        <Recommend />
        <Recommend />
        <Tool />
        <div style={{ height: 40 }} />
      </div>
    );
  }
}

// use es7 decorators remove this method
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(TableContainer);
