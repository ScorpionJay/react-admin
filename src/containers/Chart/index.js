/**
 * chart demo
 */

import React, { Component } from "react";
import Chart from "../../components/Chart";
import Table from "../../components/Table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getListAction, pageAction } from "./action";

class ChartContainer extends Component {
  getOption = () => {
    return {
      title: {
        text: "Title"
      },
      tooltip: {
        trigger: "axis"
      },
      legend: {
        data: ["data1", "data2"]
      },
      toolbox: {
        // feature: {
        //   saveAsImage: {}
        // }
      },
      dataZoom: [
        {
          startValue: "Tuesday"
        }
      ],
      grid: {
        // left: '3%',
        // right: '4%',
        // bottom: '3%',
        // containLabel: true
      },
      xAxis: [
        {
          type: "category",
          data: [
            "Monday",
            "Tuesday ",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
          ]
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "data1",
          type: "line",
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: "data2",
          type: "line",
          data: [220, 182, 191, 234, 290, 330, 310]
        }
      ]
    };
  };

  render() {
    return (
      <div>
        <div>Search</div>
        <Chart option={this.getOption()} />
        <div>Table</div>
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
)(ChartContainer);
