import React, { Component } from "react";
import RichEditor from "../../component/RichEditor";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: `<p>hello</p>
    <figure><img src="http://jay.aliyuntao.top/33.jpg"/></figure>
    <p>See advanced examples further down …</p>`
    };
  }

  getData = data => {
    console.log("container get data", data);
    this.setState({ content: data });
  };

  render() {
    const { content } = this.state;
    return (
      <div>
        <RichEditor data={content} getData={this.getData} />
      </div>
    );
  }
}

export default Edit;
