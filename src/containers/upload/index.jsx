import Upload from "../../components/Upload";
import React, { Component } from "react";

class UploadContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgList: [
        // {
        //   uid: Math.random(),
        //   url:
        //     "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
        //   name: "test"
        // }
      ]
    };
  }

  getImgUrl = list => {
    this.setState({ imgList: list });
  };

  render() {
    return (
      <div>
        <Upload
          value={this.state.imgList}
          type={"picture-card"} // picture picture-card
          onChange={this.getImgUrl}
        />
      </div>
    );
  }
}

export default UploadContainer;
