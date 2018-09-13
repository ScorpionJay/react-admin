import React, { Component } from "react";
import { Upload, Icon, Button, Modal, message } from "antd";
import "./style";

export default class UploadComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      previewVisible: false,
      fileList: props.value
    };
  }

  /**
   * 上传前的判断
   */
  beforeUpload = file => {
    const isJPG = file.type === "image/jpeg";
    if (!isJPG) {
      message.error("You can only upload JPG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }

    if (!(isJPG && isLt2M)) {
      console.log("xxx", this.props.fileList);
      this.setState(
        {
          fileList: []
        },
        () => this.props.onChange([])
      );
    }

    return isJPG && isLt2M;
  };

  /**
   * 上传中
   */
  handleChange = info => {
    // number
    const { number } = this.props;
    if (info.fileList.length > number) {
      info.fileList.splice(info.fileList.length - number);
    }

    // console.log(info);
    // only one
    // if (info.fileList.length > 1) {
    //   info.fileList.shift();
    // }

    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === "done") {
      const { fileList } = this.state;
      console.log(info.fileList);
      info.fileList.map(item => {
        if (!item.url) {
          item.url =
            "http://p95py7ttw.bkt.clouddn.com/" + info.file.response.data;
        }
      });

      this.setState(
        {
          fileList: info.fileList
        },
        () => this.props.onChange(this.state.fileList)
      );
    }
  };

  /**
   * 移除
   */
  handleRemove = info => {
    info.fileList = [];
    this.setState(
      {
        fileList: []
      },
      () => this.props.onChange([])
    );
  };

  /**
   * 预览
   */
  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  /**
   * 取消预览
   */
  handleCancel = () => this.setState({ previewVisible: false });

  render() {
    // const uploadButton = (
    //   <div>
    //     <Icon type={this.state.loading ? "loading" : "plus"} />
    //     <div className="ant-upload-text">上传</div>
    //   </div>
    // );
    const { previewVisible, previewImage, fileList } = this.state;
    return (
      <div>
        <Upload
          name="file"
          listType={this.props.type}
          className="upload"
          showUploadList={this.props.show}
          defaultFileList={this.state.fileList}
          action={this.props.action}
          beforeUpload={this.beforeUpload}
          onChange={this.handleChange}
          onRemove={this.handleRemove}
          onPreview={this.handlePreview}
        >
          <Button>
            <Icon type="upload" />
            {/* {this.props.value ? "重新上传" : "上传"} */}
            Upload
          </Button>
        </Upload>

        <Modal
          visible={previewVisible}
          footer={null}
          onCancel={this.handleCancel}
        >
          <img alt="preview" style={{ width: "100%" }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}

UploadComponent.defaultProps = {
  type: "picture-card",
  show: true,
  action: "https://m.shanghaim.net/v1/file/singleSave",
  fileList: [],
  number: 2
};
