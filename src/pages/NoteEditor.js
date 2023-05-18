import { useState } from "react";
import { Editor, EditorState } from "draft-js";
import "draft-js/dist/Draft.css";

const NoteEditor = ({ note }) => {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  return (
    <>
      <input className="notes-title"></input>

      <Editor editorState={editorState} onChange={setEditorState} />
    </>
  );
};

export default NoteEditor;

/*
class MyEditor extends React.Component {
    constructor(props) {
      super(props);
      this.state = {editorState: EditorState.createEmpty()};
      this.onChange = editorState => this.setState({editorState});
    }
  
    render() {
      return (
        <Editor editorState={this.state.editorState} onChange={this.onChange} />
      );
    }
  }*/
