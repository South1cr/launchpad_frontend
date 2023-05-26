import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Space, Modal, Spin, Alert } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { post, get } from "../services/authService";
import { DataContext } from "../context/data.context";
import ShareNote from "../components/ShareNote";
import NoteDates from "../components/NoteDates";
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
let lastTitle = "";

const UpdateNote = () => {
  const { noteId } = useParams();
  const { getNotes, notes, setActiveNote, activeNote } =
    useContext(DataContext);

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editorState, setEditor] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const setEditorState = (state) => {
    setEditor(state);
    lastEditorState = state;
  };

  const setTitleState = (title) => {
    setTitle(title);
    lastTitle = title;
  };

  const navigate = useNavigate();

  useEffect(() => {
    const foundNote = notes.find((elem) => elem._id === noteId);
    if (foundNote) {
      setNote(foundNote);
      if (foundNote._id != activeNote) {
        // new note
        console.log('diff note')
        setActiveNote(foundNote._id);
        setTitleState(foundNote.title);
        setEditorState(foundNote.content);
      } else {
        // same note
        console.log('same note')
        setTitleState(lastTitle);
        setEditorState(lastEditorState);
      }
      setLoading(false);
    }
  }, [noteId, notes]);

  const updateNote = () => {
    setUpdateLoading(true);
    post(`/notes/${noteId}`, {
      title,
      content: editorState,
    })
      .then((res) => {
        //setMessage("Note successfully updated.");
        getNotes();
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
        setUpdateLoading(false);
      });
  };

  const deleteNote = () => {
    setDeleteLoading(true);
    get(`/notes/delete/${noteId}`)
      .then((res) => {
        getNotes();
        navigate("/");
      })
      .catch((err) => {
        handle401(err);
        try {
          setError(err.response.data.message);
        } catch {
          console.log("Unhandled error", err);
        }
      })
      .finally(() => {
        setDeleteLoading(false);
      });
  };

  if (loading) {
    return (
      <div id="spinner-container">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <>
      {error && (
        <>
          <Alert message={error} banner type="error" showIcon />
          <br></br>
        </>
      )}
      {message && (
        <>
          <Alert message={message} banner type="success" showIcon/>
          <br></br>
        </>
      )}
      <Input
        placeholder="Title"
        className="notes-title"
        id="title"
        maxLength={50}
        value={title}
        onChange={(e) => setTitleState(e.target.value)}
      ></Input>
      <br></br>
        <NoteDates note={note} />
      <br></br>
      {
        <ReactQuill
          theme="snow"
          modules={quillModules}
          formats={quillFormats}
          value={editorState}
          onChange={setEditorState}
        />
      }
      <br></br>
      {error && (
        <>
          <Alert message={error} banner type="error" showIcon />
          <br></br>
        </>
      )}
      <Space>
        <Button
          type="primary"
          disabled={!title}
          onClick={updateNote}
          loading={updateLoading}
        >
          Save
        </Button>
        <ShareNote />
        <Button
          onClick={() => setShowModal(true)}
          type="primary"
          loading={deleteLoading}
          danger
        >
          Delete
        </Button>
      </Space>
      <Modal
        closeIcon={<i className="fa-solid fa-xmark"></i>}
        title="Delete Note"
        open={showModal}
        okText={"Delete Note"}
        onOk={deleteNote}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <p>
          Are you sure you want to delete {title ? title : "this note"}. This
          action cannot be undone.
        </p>
        <br></br>
      </Modal>
    </>
  );
};

export default UpdateNote;
