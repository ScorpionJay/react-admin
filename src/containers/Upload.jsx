import Upload from "../component/Upload";
import React, { Component } from "react";

class UploadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgUrl: ""
    };
  }

  getImgUrl = url => {
    this.setState({ imgUrl: url }, () => console.log(this.state));
  };

  render() {
    return (
      <div>
        <Upload
          defaultValue={
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
          type={"picture-card"} // picture picture-card
          getImgUrl={this.getImgUrl}
        />

        <hr />

        <Upload
          defaultValue={
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
          type={"text"} // picture picture-card
          getImgUrl={this.getImgUrl}
        />

        <hr />

        <Upload
          defaultValue={
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
          type={"picture"} // picture picture-card
          getImgUrl={this.getImgUrl}
        />

        <hr />

        <Upload
          defaultValue={
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
          type={"picture"} // picture picture-card
          show={false}
          getImgUrl={this.getImgUrl}
        />
      </div>
    );
  }
}

export default UploadContainer;
