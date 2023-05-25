import { createContext, useState, useEffect } from "react";
import { get } from "../services/authService";
import { handle401 } from "../services/handle401";

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
    setIsLoading(true)
    if (user) {
      get(`/notes`)
        .then((res) => {
          setNotes(res.data);
        })
        .catch((err) => {
          handle401(err);
          console.log(err)
        })
        .finally(() => {
          setIsLoading(false)
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
