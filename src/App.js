import "./App.css";
import { useState } from 'react'; 
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import Navbar from "./components/Navbar";
import NotesMenu from "./components/NotesMenu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateNote from "./pages/CreateNote";
import UpdateNote from "./pages/UpdateNote";

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
      <Navbar menuOnClick={toggleMenu} menuActive={showNotesMenu}/>
      <NotesMenu shown={showNotesMenu} />
      <div id="container" style={{marginLeft: showNotesMenu ? '270px' : '0px'}}>
        <Routes>
          <Route element={<NotLoggedIn />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route element={<LoggedIn />}>
            <Route exact path='/' element={<CreateNote />} />
            <Route path='/:noteId' element={<UpdateNote />} />
            <Route exact path='/settings' element={<></>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
