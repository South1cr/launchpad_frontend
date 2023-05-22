import { createContext, useState, useEffect } from "react";
import { get } from "../services/authService";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState("");
  const [showNotesMenu, setShowNotesMenu] = useState(window.innerWidth > 768);

  const toggleMenu = () => {
    setShowNotesMenu(!showNotesMenu);
  }

  const getNotes = () => {
    if (user) {
      get(`/notes`)
        .then((res) => {
          setNotes(res.data);
        })
        .catch((err) => {
          console.log(err)
        })
    }
  };

  useEffect(() => {
    getNotes();
  }, [user]);

  return (
    <DataContext.Provider
      value={{
        notes,
        user,
        isLoading,
        setIsLoading,
        setUser,
        getNotes,
        activeNote,
        setActiveNote,
        showNotesMenu,
        toggleMenu,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };
