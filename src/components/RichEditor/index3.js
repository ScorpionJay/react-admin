/**
 * rich editor component
 */
import React from "react";
import {
  Editor,
  EditorState,
  AtomicBlockUtils,
  convertToRaw,
  convertFromHTML,
  ContentState,
  CompositeDecorator
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export default class RichEditor extends React.Component {
  constructor(props) {
    super(props);
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

  //   componentWillReceiveProps(nextProps) {
  //     const decorator = new CompositeDecorator([
  //       {
  //         strategy: findLinkEntities,
  //         component: Link
  //       },
  //       {
  //         strategy: findImageEntities,
  //         component: Image
  //       }
  //     ]);

  //     const blocksFromHTML = convertFromHTML(nextProps.data || "<div>1</div>");
  //     const state = ContentState.createFromBlockArray(
  //       blocksFromHTML.contentBlocks,
  //       blocksFromHTML.entityMap
  //     );

  //     this.setState({
  //       editorState: nextProps.data
  //         ? EditorState.createWithContent(state, decorator)
  //         : EditorState.createEmpty()
  //     });
  //   }

  logState = () => {
    const content = this.state.editorState.getCurrentContent();
    const html = stateToHTML(content);
    console.log(html);
    this.props.getData && this.props.getData(html);
    // console.log(JSON.stringify(convertToRaw(content)));
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
        </div>
      );
    }
    return (
      <div style={styles.root}>
        <div style={{ marginBottom: 10 }}>Rich Editor</div>
        <div style={styles.buttons}>
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
        {urlInput}
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref="editor"
            // blockRendererFn={mediaBlockRenderer}
          />
        </div>
        <input
          onClick={this.logState}
          style={styles.button}
          type="button"
          value="Log State"
        />
      </div>
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

function mediaBlockRenderer(block) {
  console.log("xxx");
  if (block.getType() === "atomic") {
    return {
      component: Media,
      editable: false
    };
  }
  return null;
}
const Audio1 = props => {
  return <audio controls src={props.src} style={styles.media} />;
};
const Image1 = props => {
  return <img src={props.src} style={styles.media} />;
};
const Video1 = props => {
  return <video controls src={props.src} style={styles.media} />;
};
const Media = props => {
  const entity = props.contentState.getEntity(props.block.getEntityAt(0));
  const { src } = entity.getData();
  const type = entity.getType();
  let media = src;
  if (type === "audio") {
    media = <Audio1 src={src} />;
  } else if (type === "IMAGE") {
    media = <Image1 src={src} />;
  } else if (type === "video") {
    media = <Video1 src={src} />;
  }
  return media;
};

const styles = {
  root: {
    fontFamily: "'Helvetica', sans-serif",
    padding: 20,
    width: 600
  },
  editor: {
    border: "1px solid #ccc",
    cursor: "text",
    minHeight: 80,
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
