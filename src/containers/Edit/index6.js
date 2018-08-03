/**
 * https://zhuanlan.zhihu.com/p/24951621
 */
import React from "react";
import {
  AtomicBlockUtils,
  Editor,
  EditorState,
  RichUtils,
  convertToRaw,
  convertFromHTML,
  ContentState,
  convertFromRaw,
  CompositeDecorator
} from "draft-js";
import { stateToHTML } from "draft-js-export-html";

export default class HTMLConvertExample extends React.Component {
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

    // const data = {
    //   blocks: [
    //     {
    //       key: "9gm3s",
    //       text:
    //         "You can have images in your text field. This is a very rudimentary example, but you can enhance the image plugin with resizing, focus or alignment plugins.",
    //       type: "unstyled",
    //       depth: 0,
    //       inlineStyleRanges: [],
    //       entityRanges: [],
    //       data: {}
    //     },
    //     {
    //       key: "ov7r",
    //       text: " ",
    //       type: "atomic",
    //       depth: 0,
    //       inlineStyleRanges: [],
    //       entityRanges: [{ offset: 0, length: 1, key: 0 }],
    //       data: {}
    //     },
    //     {
    //       key: "e23a8",
    //       text: "See advanced examples further down …",
    //       type: "unstyled",
    //       depth: 0,
    //       inlineStyleRanges: [],
    //       entityRanges: [],
    //       data: {}
    //     }
    //   ],
    //   entityMap: {
    //     "0": {
    //       type: "IMAGE",
    //       mutability: "IMMUTABLE",
    //       data: { src: "http://jay.aliyuntao.top/33.jpg" }
    //     }
    //   }
    // };
    console.log("xxxxxxxxxx", state);
    this.state = {
      // editorState: EditorState.createWithContent(
      //   convertFromRaw(data),
      //   decorator
      // )
      editorState: EditorState.createWithContent(state, decorator)
      // editorState: EditorState.createEmpty()
    };
    this.focus = () => this.refs.editor.focus();
    this.onChange = editorState => this.setState({ editorState });
    this.logState = () => {
      const content = this.state.editorState.getCurrentContent();
      console.log(stateToHTML(content));
      console.log(JSON.stringify(convertToRaw(content)));
      // console.log(JSON.stringify(content.toJS()));
    };
  }

  componentDidMount() {
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
    const content = this.state.editorState.getCurrentContent();
    console.log(JSON.stringify(convertToRaw(content)));
    let d = convertToRaw(content);
    this.setState(
      {
        editorState: EditorState.createEmpty()
        // editorState: EditorState.createWithContent(content, decorator)
      },
      () =>
        this.setState({
          editorState: EditorState.createWithContent(
            convertFromRaw(d),
            decorator
          )
        })
    );
  }

  render() {
    const content = this.state.editorState.getCurrentContent();
    console.log("render");
    console.log(JSON.stringify(convertToRaw(content)));

    return (
      <div style={styles.root}>
        <div style={{ marginBottom: 10 }}>
          Sample HTML converted into Draft content state
        </div>
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
