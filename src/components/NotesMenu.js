import { useContext, useState } from "react";
import { Divider, Input, Button, Dropdown, Space, Spin } from "antd";
import { Link } from "react-router-dom";
import "react-perfect-scrollbar/dist/css/styles.css";
import PerfectScrollbar from "react-perfect-scrollbar";
import { DataContext } from "../context/data.context";

const sortByUpdatedDate = (notes) => {
  notes.sort(function (a, b) {
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });
  return notes;
};

const sortByCreatedDate = (notes) => {
  notes.sort(function (a, b) {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
  return notes;
};

const sortByTitle = (notes) => {
  notes.sort(function (a, b) {
    console.log(a.title, b.title);
    return a.title.localeCompare(b.title);
  });
  return notes;
};

const dropDownItems = [
  {
    key: "1",
    type: "group",
    label: "Sort By",
    children: [
      {
        key: "updatedAt",
        label: "Updated Date",
      },
      {
        key: "createdAt",
        label: "Created Date",
      },
      {
        key: "title",
        label: "Title",
      },
    ],
  },
];

const NotesMenu = () => {
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("updatedAt");

  const { notes, activeNote, user, showNotesMenu, isLoading } =
    useContext(DataContext);

  const filtered = notes.filter((elem) => {
    return elem.title.includes(filter);
  });

  let sorted;
  if (sort === "updatedAt") {
    sorted = sortByUpdatedDate(filtered);
  } else if (sort === "createdAt") {
    sorted = sortByCreatedDate(filtered);
  } else if (sort === "title") {
    console.log("ran");
    sorted = sortByTitle(filtered);
  }

  return (
    <div
      id="notes-menu"
      style={{ marginLeft: showNotesMenu ? "0px" : "-270px" }}
    >
      {user &&
        (isLoading ? (
          <div id="notes-menu-spinner">
            <Spin size="large"></Spin>
          </div>
        ) : (
          <>
            <Link
              id="notes-menu-create"
              className="link-no-decoration"
              to={`/`}
            >
              Create Note&nbsp;<i className="fa-solid fa-plus"></i>
            </Link>
            <Space>
              <Input
                id="notes-filter"
                placeholder="Filter"
                onChange={(e) => setFilter(e.target.value)}
              ></Input>
              <Dropdown
                trigger={["click"]}
                menu={{
                  items: dropDownItems,
                  selectable: true,
                  defaultSelectedKeys: ["updatedAt"],
                  onClick: ({ key }) => {
                    setSort(key);
                  },
                }}
              >
                <Button type="text" id="notes-menu-sort">
                  <i className="fa-solid fa-arrow-down-a-z"></i>
                </Button>
              </Dropdown>
            </Space>
            <Divider dashed />
            <PerfectScrollbar className="notes-menu-scrollbar"  options={{suppressScrollX:true, useBothWheelAxes:false}}>
              {sorted.map((note, i) => {
                return (
                  <div
                    className={`notes-menu-link ${
                      activeNote === note._id && "active"
                    }`}
                    key={i}
                  >
                    <Link className="link-no-decoration" to={`/${note._id}`}>
                      {note.title}
                      &emsp;
                      <i
                        className={`fa-solid fa-pencil ${
                          activeNote !== note._id && "hidden"
                        }`}
                      ></i>
                    </Link>
                  </div>
                );
              })}
            </PerfectScrollbar>
          </>
        ))}
    </div>
  );
};

export default NotesMenu;
