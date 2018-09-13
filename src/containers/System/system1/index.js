import React, { Component } from "react";

import { Tree } from "antd";

const TreeNode = Tree.TreeNode;

class Demo extends Component {
  constructor(props) {
    super();
    this.state = {
      selectedKeys1: [],
      selectedKeys2: []
    };
  }

  onSelect1 = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
    this.setState({
      selectedKeys1: selectedKeys,
      selectedKeys2: []
    });
  };
  onSelect2 = (selectedKeys, info) => {
    console.log("selected", selectedKeys, info);
    this.setState({
      selectedKeys1: [],
      selectedKeys2: selectedKeys
    });
  };

  render() {
    return (
      <div>
        <Tree
          defaultExpandAll={true}
          selectedKeys={this.state.selectedKeys1}
          onSelect={this.onSelect1}
        >
          <TreeNode title="parent 1" key="1">
            <TreeNode title="1-1" key="01" />
            <TreeNode title="2-2" key="02" />
            <TreeNode title="3-3" key="03" />
          </TreeNode>
        </Tree>

        <Tree
          defaultExpandAll={true}
          selectedKeys={this.state.selectedKeys2}
          onSelect={this.onSelect2}
        >
          <TreeNode title="parent 2" key="2">
            <TreeNode title="2-1" key="11" />
            <TreeNode title="2-2" key="12" />
            <TreeNode title="2-3" key="13" />
          </TreeNode>
        </Tree>
      </div>
    );
  }
}

export default Demo;
