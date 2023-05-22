import { useState, useContext } from "react";
import { Button, Input, Space, Modal } from "antd";
import { post } from "../services/authService";
import { DataContext } from "../context/data.context";
import { thisUrl } from "../services/baseUrl";

const ShareNote = () => {
  const { activeNote } = useContext(DataContext);

  const [shareCode, setShareCode] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const shareNote = () => {
    setLoading(true);
    post("/share/create", {
      noteId: activeNote,
    })
      .then((res) => {
        if(res && res.data){
            setShareCode(res.data.shareCode);
            setShowModal(true);
        }
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
      <Button onClick={shareNote} loading={loading} type="primary" title="Share">
        <i className="fa-solid fa-share"></i>
      </Button>
      <Modal
        closeIcon={<i className="fa-solid fa-xmark"></i>}
        title="Share Note"
        open={showModal}
        onOk={() => setShowModal(false)}
        onCancel={() => {
          setShowModal(false);
        }}
      >
        <p>
          Your share link:{" "}
          <a
            href={`${thisUrl}/shared/${shareCode}`}
          >{`${thisUrl}/shared/${shareCode}`}</a>{" "}
          Anyone with this link can view this note.
        </p>
      </Modal>
    </>
  );
};

export default ShareNote;
