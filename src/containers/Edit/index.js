import React, { Component } from "react";
import RichEditor from "../../components/RichEditor";

class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    //   content: `<p>hello</p><a href="https://google.com">google</a>
    // <figure><img src="http://jay.aliyuntao.top/33.jpg"/></figure>
    // <p>See advanced examples further down …</p>`

    content: `<a href="https://google.com">google</a>  <a href="https://baidu.com">baidu</a>`
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
