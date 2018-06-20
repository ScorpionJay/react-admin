import React, { Component } from "react";

import { Upload, Icon, Button, Modal, message } from "antd";
import "./style";

class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      imageUrl: props.defaultValue || "",
      fileList: props.defaultValue
        ? [
            {
              uid: Math.random(),
              url: props.defaultValue,
              name: props.defaultValue
            }
          ]
        : []
    };
  }

  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJPG && isLt2M;
  };

  handleChange = info => {
    console.log(info);
    // only one
    if (info.fileList.length > 1) {
      info.fileList.shift();
    }

    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState(
        {
          imageUrl:
            "http://p95py7ttw.bkt.clouddn.com/" + info.file.response.data,
          loading: false
        },
        this.props.getImgUrl(this.state.imageUrl)
      );
    }
  };

  handleRemove = info => {
    info.fileList = [];
    this.setState({
      fileList: [],
      imageUrl: ""
    });
  };

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    console.log(this.state);

    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const imageUrl = this.state.imageUrl;
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div>
        <Upload
          name="file"
          listType={this.props.type}
          className="upload"
          showUploadList={this.props.show === undefined}
          defaultFileList={[...this.state.fileList]}
          action="//api.nway.top/v1/file/singleSave"
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          onPreview={this.handlePreview}
        >
          <Button>
            <Icon type="upload" /> {imageUrl ? "重新上传" : "上传"}
          </Button>
        </Upload>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="example" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

export default UploadComponent;
