import React from "react";
import {
  Editor,
  EditorState,
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
    const sampleMarkup = `<p>hello</p>
      <figure><img src="http://jay.aliyuntao.top/33.jpg"/></figure>
      <p>See advanced examples further down …</p>`;
    const blocksFromHTML = convertFromHTML(sampleMarkup);
    const state = ContentState.createFromBlockArray(
      blocksFromHTML.contentBlocks,
      blocksFromHTML.entityMap
    );

    this.state = {
      editorState: EditorState.createWithContent(state, decorator)
      // editorState: EditorState.createEmpty()
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(stateToHTML(content));
      console.log(JSON.stringify(convertToRaw(content)));
    };
  }

  render() {
    return (
      <div style={styles.root}>
        <div style={{ marginBottom: 10 }}>Rich Editor</div>
        <div style={styles.editor} onClick={this.focus}>
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            ref="editor"
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
  return <img src={src} height={height} width={width} />;
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
  }
};
