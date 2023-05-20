import { useContext, useState } from "react";
import { Button, Input } from "antd";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { LoadingContext } from "../context/loading.context";

const sortByUpdatedDate = (notes) => {
  notes.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  return notes;
};

const NotesMenu = ({ shown }) => {
  const [filter, setFilter] = useState("");

  const { notes, activeNote } = useContext(LoadingContext);

  const filtered = notes.filter((elem) => {
    return elem.title.includes(filter);
  });

  const sorted = sortByUpdatedDate(filtered);

  return (
    <div id="notes-menu" style={{ marginLeft: shown ? "0px" : "-270px" }}>
      {/*<Button type="primary" id="notes-menu-create">
        Create Note&nbsp;<i className="fa-solid fa-plus"></i>
  </Button>*/}
      {      <Link id="notes-menu-create" className="link-no-decoration" to={`/`}>
        Create Note&nbsp;<i className="fa-solid fa-plus"></i>
      </Link> }
      <div className="flex">
        <Input
          id="notes-filter"
          placeholder="Filter"
          onChange={(e) => setFilter(e.target.value)}
        ></Input>
        &emsp;<i className="fa-solid fa-sliders"></i>
      </div>
      <br></br>
      {sorted.map((note, i) => {
        return (
          <div
            className={`notes-menu-link ${activeNote === note._id && "active"}`}
            key={i}
          >
            <Link className="link-no-decoration" to={`/${note._id}`}>
              {note.title}
              &emsp;<i className={`fa-solid fa-pencil ${activeNote !== note._id && "hidden"}`}></i>
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default NotesMenu;
