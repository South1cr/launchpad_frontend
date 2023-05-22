import { useState, useContext, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Input, Space, Modal, Spin } from "antd";
import { Editor } from "@tinymce/tinymce-react";
import { post, get } from "../services/authService";
import { DataContext } from "../context/data.context";
import ShareNote from "../components/ShareNote";

const UpdateNote = () => {
  const { noteId } = useParams();
  const { getNotes, notes, setActiveNote } = useContext(DataContext);
  const editorRef = useRef(null);

  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(true);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [editorState, setEditorState] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [note, setNote] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('rerendered')
    const note = notes.find((elem) => elem._id === noteId);
    if (note) {
      setTitle(note.title);
      setEditorState(note.content);
      setNote(note);
      setActiveNote(note._id);
      setLoading(false);
    }
  }, [noteId, notes]);

  const updateNote = () => {
    setUpdateLoading(true);
    post(`/notes/${noteId}`, {
      title,
      content: editorRef.current.getContent(),
    })
      .then((res) => {
        getNotes();
      })
      .catch((err) => {
        console.log(err)
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
        console.log(err)
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
      <Input
        placeholder="Title"
        className="notes-title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      ></Input>
      <br></br>
      <div id="note-dates">
        <span>Updated:&nbsp;{new Date(note.updatedAt).toLocaleString()}</span>
        &emsp;
        <span>Created:&nbsp;{new Date(note.createdAt).toLocaleString()}</span>
      </div>
      <br></br>
      <Editor
        apiKey="ot2bdgoybtbapmogrubcozadhnvaw74nono3sw2rqw183cze"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={editorState}
        init={{
          height: 500,
          menubar: true,
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | help",
          content_style:
            "body { font-family:Roboto,sans-serif; font-size:14px }",
        }}
      />

      <br></br>
      <Space>
        <Button
          type="primary"
          disabled={!title}
          onClick={updateNote}
          loading={updateLoading}
        >
          Update
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
