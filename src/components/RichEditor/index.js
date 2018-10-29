/*
 * @Author: jay 
 * @Date: 2018-10-11 16:19:41 
 * @Last Modified by: jay
 * @Last Modified time: 2018-10-29 14:21:03
 * @Description rich editor component
 */

import React from "react";
import {
  Editor,
  EditorState,
  AtomicBlockUtils,
  convertToRaw,
  convertFromHTML,
  ContentState,
  CompositeDecorator,
  RichUtils
} from "draft-js";
import { message, Modal } from "antd";
import { stateToHTML } from "draft-js-export-html";

export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);

    // decorator
    const decorator = new CompositeDecorator([
      {
        strategy: findLinkEntities,
        component: Link
      },
      {
        strategy: findImageEntities,
        component: Image
      }
    ]);

    const blocksFromHTML = convertFromHTML(props.data || "<div>1</div>");
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.state = {
      editorState: props.data
        ? EditorState.createWithContent(state, decorator)
        : EditorState.createEmpty()
      // editorState: EditorState.createEmpty()
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
  }

  // log
  logState = () => {
    const content = this.state.editorState.getCurrentContent();
    const html = stateToHTML(content);
    console.log(html);
    this.props.getData && this.props.getData(html);
    // console.log(JSON.stringify(convertToRaw(content)));
  };

  /**
   * prompt link
   */
  promptForLink = e => {
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      const contentState = editorState.getCurrentContent();
      const startKey = editorState.getSelection().getStartKey();
      const startOffset = editorState.getSelection().getStartOffset();
      const blockWithLinkAtBeginning = contentState.getBlockForKey(startKey);
      const linkKey = blockWithLinkAtBeginning.getEntityAt(startOffset);
      let url = "";
      if (linkKey) {
        const linkInstance = contentState.getEntity(linkKey);
        url = linkInstance.getData().url;
      }
      this.setState(
        {
          showURLInput: true,
          urlValue: url
        },
        () => {
          //setTimeout(() => this.refs.url.focus(), 0);
        }
      );
    } else {
      console.log("please select word");
      message.warning("please select word");
    }
  };

  /**
   * confirm link
   */
  confirmLink = e => {
    e.preventDefault();
    const { editorState, urlValue } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.setState(
      {
        editorState: RichUtils.toggleLink(
          newEditorState,
          newEditorState.getSelection(),
          entityKey
        ),
        showURLInput: false,
        urlValue: ""
      },
      () => {
        //setTimeout(() => this.refs.editor.focus(), 0);
      }
    );
  };

  // remove link
  removeLink = e => {
    e.preventDefault();
    const { editorState } = this.state;
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      this.setState({
        editorState: RichUtils.toggleLink(editorState, selection, null)
      });
    } else {
      console.log("please select word");
      message.warning("please select word");
    }
  };

  confirmMedia = e => {
    e.preventDefault();
    const { editorState, urlValue, urlType } = this.state;
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      urlType,
      "MUTABLE",
      { src: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    console.log("xxxxxxxxxxxxxxxxxxxxxxx111", entityKey);
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity
    });
    this.setState(
      {
        editorState: AtomicBlockUtils.insertAtomicBlock(
          newEditorState,
          entityKey,
          " "
        ),
        showURLInput: false,
        urlValue: ""
      },
      () => {
        setTimeout(() => this.focus(), 0);
      }
    );
  };

  onURLInputKeyDown = e => {
    if (e.which === 13) {
      this.confirmMedia(e);
    }
  };
  promptForMedia = type => {
    this.setState(
      {
        showURLInput: true,
        urlValue: "",
        urlType: type
      },
      () => {
        setTimeout(() => this.refs.url.focus(), 0);
      }
    );
  };
  addAudio = () => {
    this.promptForMedia("AUDIO");
  };
  addImage = () => {
    this.promptForMedia("IMAGE");
  };
  addVideo = () => {
    this.promptForMedia("VIDEO");
  };
  addLink = () => {
    this.promptForLink("LINK");
  };

  onURLChange = e => this.setState({ urlValue: e.target.value });

  render() {
    let urlInput;
    if (this.state.showURLInput) {
      urlInput = (
        <div style={styles.urlInputContainer}>
          <input
            onChange={this.onURLChange}
            ref="url"
            style={styles.urlInput}
            type="text"
            value={this.state.urlValue}
            onKeyDown={this.onURLInputKeyDown}
          />
          <button onMouseDown={this.confirmMedia}>Confirm</button>
          <button onMouseDown={this.confirmLink}>Confirm Link</button>
        </div>
      );
    }
    return (
      <React.Fragment>
        <div style={styles.root}>
          {/* <div style={{ marginBottom: 10, textAlign: "center" }}>
            Rich Editor
          </div> */}
          <div style={styles.buttons}>
            <button onMouseDown={this.addLink} style={{ marginRight: 10 }}>
              Link
            </button>
            <button onMouseDown={this.removeLink} style={{ marginRight: 10 }}>
              Remove link
            </button>
            <button onMouseDown={this.addAudio} style={{ marginRight: 10 }}>
              Add Audio
            </button>
            <button onMouseDown={this.addImage} style={{ marginRight: 10 }}>
              Add Image
            </button>
            <button onMouseDown={this.addVideo} style={{ marginRight: 10 }}>
              Add Video
            </button>
          </div>

          <hr style={{ border: "1px solid #ccc" }} />
          <div style={styles.editor} onClick={this.focus}>
            <Editor
              editorState={this.state.editorState}
              onChange={this.onChange}
              ref="editor"
              readOnly={this.props.readOnly}
              // blockRendererFn={mediaBlockRenderer}
            />
          </div>
        </div>
        <Modal
          visible={this.state.showURLInput}
          onCancel={() => this.setState({ showURLInput: false })}
          maskClosable={false}
        >
          {urlInput}
        </Modal>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </React.Fragment>
    );
  }
}
function findLinkEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "LINK"
    );
  }, callback);
}
const Link = props => {
  const { url } = props.contentState.getEntity(props.entityKey).getData();
  return (
    <a href={url} style={styles.link}>
      {props.children}
    </a>
  );
};
function findImageEntities(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();
    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === "IMAGE"
    );
  }, callback);
}
const Image = props => {
  const { height, src, width } = props.contentState
    .getEntity(props.entityKey)
    .getData();
  return <img src={src} height={height} width={width} style={styles.media} />;
};

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600,
    minHeight: 300,
    border: "1px solid #ccc"
  },
  editor: {
    // border: "1px solid #ccc",
    cursor: "text",
    minHeight: 200,
    padding: 10
  },
  button: {
    marginTop: 10,
    textAlign: "center"
  },
  media: {
    width: "100%",
    // Fix an issue with Firefox rendering video controls
    // with 'pre-wrap' white-space
    whiteSpace: "initial"
  }
};
