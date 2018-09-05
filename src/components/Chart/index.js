/**
 * chart
 */

import React from "react";
import ReactEcharts from "echarts-for-react";

export default class Chart extends React.PureComponent {
  render() {
    return <ReactEcharts option={this.props.option} />;
  }
}
