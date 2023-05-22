import { useState, useContext, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Space, Modal } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { post, get } from "../services/authService";
import { LoadingContext } from "../context/loading.context";

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

const UpdateNote = () => {
  const { noteId } = useParams();
  const { getNotes, notes, setActiveNote } = useContext(LoadingContext);

  const [title, setTitle] = useState("");
  const [editorState, setEditorState] = useState("");
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const note = notes.find((elem) => elem._id === noteId);
    if (note) {
      setTitle(note.title);
      setEditorState(note.content);
      setActiveNote(note._id);
    }
  }, [noteId, notes]);

  console.log(editorState)

  const openModal = () => {
    setShowModal(true);
  };

  const updateNote = () => {
    post(`/notes/${noteId}`, {
      title,
      content: editorState,
    })
      .then((res) => {
        getNotes();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteNote = () => {
    get(`/notes/delete/${noteId}`)
      .then((res) => {
        getNotes();
        navigate("/");
        setShowModal(false);
      })
      .catch((err) => {
        if (err.response.status === 400) {
          window.location.reload(true);
        }
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
      <ReactQuill
        value={editorState}
        modules={modules}
        onChange={setEditorState}
        theme="snow"
      />
      <br></br>
      <Space>
        <Button type="primary" disabled={!title} onClick={updateNote}>
          Update
        </Button>
        <Button onClick={openModal} type="primary" danger>
          Delete
        </Button>
      </Space>
      <Modal
        closeIcon={<i className="fa-solid fa-xmark"></i>}
        title="Delete Note"
        open={showModal}
        okText={"Confirm"}
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
