import "./App.css";
import { useState } from 'react'; 
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import NotesMenu from "./components/NotesMenu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NoteEditor from "./pages/NoteEditor";

function App() {

  const [showNotesMenu, setShowNotesMenu] = useState(window.innerWidth > 768);

  const toggleMenu = () => {
    setShowNotesMenu(!showNotesMenu);
  }

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const LoggedIn = () => {
    return getToken() ? <Outlet /> : <Navigate to="/login" />;
  };

  const NotLoggedIn = () => {
    return !getToken() ? <Outlet /> : <Navigate to="/" />;
  };

  

  return (
    <div className="App">
      <Navbar menuOnClick={toggleMenu}/>
      <NotesMenu shown={showNotesMenu} />
      <div id="container" style={{marginLeft: showNotesMenu ? '250px' : '0px'}}>
        <Routes>
          <Route element={<NotLoggedIn />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route element={<LoggedIn />}>
            <Route path='/' element={<NoteEditor />} />
            <Route path='/:noteId' element={<></>} />
            <Route path='/settings' element={<></>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
