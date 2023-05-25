import { useState, useContext, useEffect } from "react";
import { Button, Input, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { post } from "../services/authService";
import { DataContext } from "../context/data.context";
import { handle401 } from "../services/handle401";

const quillModules = {
  toolbar: [
    ['bold', 'italic', 'underline', 'strike'],    
    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
    [{ 'font': [] }],    // toggled buttons
    ['blockquote'],
                 // custom button values
    [{ 'list': 'ordered'}, { 'list': 'bullet' }],                         // text direction
  
    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'align': [] }],

    ["link", "image", "video"],
  
    ['clean']                                         // remove formatting button
  ]
}

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "link",
  "color",
  "image",
  "background",
  "align",
  "size",
  "font",
];

let lastEditorState = "";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState("");
  const [editorState, setEditorState] = useState("");
  const [error, setError] = useState(false);

  const { getNotes, setActiveNote, activeNote } = useContext(DataContext);

  const setEditor = (state) => {
    setEditorState(state);
    lastEditorState = state;
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (activeNote != "") {
      // just switched to create note view
      setEditor("");
    } else {
      // still on create note view
      setEditor(lastEditorState);
    }
    setActiveNote(""); // reset active note
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    post("/notes/create", {
      title,
      content: editorState,
    })
      .then((res) => {
        getNotes();
        navigate(`/${res.data._id}`);
      })
      .catch((err) => {
        handle401(err);
        try {
          setError(err.response.data.message);
        } catch {
          console.log("Unhandled error", err);
          if(err.code === 'ERR_NETWORK'){
            setError('File upload size is too large.');
          }
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {error && (
        <>
          <Alert message={error} type="error" showIcon/>
          <br></br>
        </>
      )}
      <Input
        placeholder="Title"
        id="title"
        className="notes-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      <br></br>
      <ReactQuill
        theme="snow"
        modules={quillModules}
        formats={quillFormats}
        preserveWhitespace={false}
        value={editorState}
        onChange={setEditor}
        placeholder="Content goes here..."
      />
      <br></br>
      <Button
        type="primary"
        disabled={!title}
        onClick={handleSubmit}
        loading={loading}
      >
        Create
      </Button>
    </>
  );
};

export default CreateNote;
