import { createContext, useState, useEffect } from "react";
import { get } from "../services/authService";

const LoadingContext = createContext();

const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [activeNote, setActiveNote] = useState("")

  const getNotes = () => {
    if (user) {
        get(`/notes`)
        .then((res) => {
          setNotes(res.data)
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getNotes();
  }, [user]);

  return (
    <LoadingContext.Provider
      value={{ notes, user, isLoading, setIsLoading, setUser, getNotes, activeNote, setActiveNote  }}
    >
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
