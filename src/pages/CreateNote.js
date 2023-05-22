import { useState, useContext, useEffect, useRef } from "react";
import { Button, Input } from "antd";
import { useNavigate } from "react-router-dom";
import { Editor } from "@tinymce/tinymce-react";
import { post } from "../services/authService";
import { DataContext } from "../context/data.context";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState("");
  const editorRef = useRef(null);

  const { getNotes, setActiveNote } = useContext(DataContext);

  const navigate = useNavigate();

  useEffect(() => {
    setActiveNote(""); // reset active note
  }, []);

  const handleSubmit = () => {
    setLoading(true);
    post("/notes/create", {
      title,
      content: editorRef.current.getContent(),
    })
      .then((res) => {
        getNotes();
        navigate(`/${res.data._id}`);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
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
      <Editor
        apiKey="ot2bdgoybtbapmogrubcozadhnvaw74nono3sw2rqw183cze"
        onInit={(evt, editor) => (editorRef.current = editor)}
        initialValue={""}
        init={{
          height: 500,
          menubar: true,
          toolbar:
            "undo redo | formatselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent ",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
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
