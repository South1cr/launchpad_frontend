import { useState, useEffect } from "react";
import { Input, Spin } from "antd";
import { useParams } from "react-router-dom";
//import { Editor } from "@tinymce/tinymce-react";
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { get } from "../services/authService";

const SharedNote = () => {
  const { shareId } = useParams();
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNote = () => {
    get(`/share/${shareId}`)
      .then((res) => {
        setNote(res.data);
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => {
        setLoading(false);
      })
  };

  useEffect(() => {
    fetchNote();
  }, []);

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
        className="notes-title shared"
        value={note.title}
        disabled
      ></Input>
      <br></br>
      <ReactQuill
        theme="snow"
        readOnly
        value={note.content}
      />
      {/*<Editor
        disabled
        apiKey="ot2bdgoybtbapmogrubcozadhnvaw74nono3sw2rqw183cze"
        initialValue={note.content}
        init={{
          height: 500,
          menubar: false,
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
      />*/}
    </>
  );
};

export default SharedNote;
