import Upload from "../../components/Upload";
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
          value={
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
          type={"picture-card"} // picture picture-card
          onChange={this.getImgUrl}
        />

        <hr />

        <Upload
          value={
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
          type={"text"} // picture picture-card
          onChange={this.getImgUrl}
        />

        <hr />

        <Upload
          value={
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
          type={"picture"} // picture picture-card
          onChange={this.getImgUrl}
        />

        <hr />

        <Upload
          value={
            "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          }
          type={"picture"} // picture picture-card
          show={false}
          onChange={this.getImgUrl}
        />
      </div>
    );
  }
}

export default UploadContainer;
