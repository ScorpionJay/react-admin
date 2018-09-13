import React, { Component } from "react";
import DragTable from "../../../components/Table/dragTable";

class system1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [
        {
          key: "1",
          name: "John Brown",
          age: 32,
          address: "New York No. 1 Lake Park"
        },
        {
          key: "2",
          name: "Jim Green",
          age: 42,
          address: "London No. 1 Lake Park"
        },
        {
          key: "3",
          name: "Joe Black",
          age: 32,
          address: "Sidney No. 1 Lake Park"
        }
      ]
    };
  }

  move = data => {
    this.setState({ data });
  };

  columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name"
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    }
  ];

  render() {
    const { data } = this.state;

    return (
      <div>
        drag table
        <DragTable columns={this.columns} data={data} move={this.move} />
      </div>
    );
  }
}

export default system1;
