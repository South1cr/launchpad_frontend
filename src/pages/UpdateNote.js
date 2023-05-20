import { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button, Input } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { post } from "../services/authService";
import { LoadingContext } from "../context/loading.context";

const UpdateNote = () => {
  const { noteId } = useParams();
  const { getNotes, notes, setActiveNote } = useContext(LoadingContext);

  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState("");

  useEffect(() => {
    const note = notes.find((elem)=>elem._id === noteId);
    if(note){
        setTitle(note.title);
        setEditorState(note.content);
        setActiveNote(note._id);
    }
  }, [noteId, notes])


  const modules = {
    toolbar: [
      [{ font: [] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }, { align: [] }],
      ["link", "image"],
      ["clean"],
    ],
  };

  const handleSubmit = () => {
    post(`/notes/${noteId}`, {
      title,
      content: editorState,
    })
      .then((res) => {
        getNotes();
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
    <Input
      placeholder="Title"
      className="notes-title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    ></Input>
    <br></br>
    <ReactQuill modules={modules} onChange={setEditorState} theme="snow" />
    <br></br>
    <Button type="primary" onClick={handleSubmit}>
      Update
    </Button>
  </>
  )

};

export default UpdateNote;
