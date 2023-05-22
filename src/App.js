import "./App.css";
import { useContext } from 'react'; 
import { Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { DataContext } from "./context/data.context";
import Navbar from "./components/Navbar";
import NotesMenu from "./components/NotesMenu";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import CreateNote from "./pages/CreateNote";
import UpdateNote from "./pages/UpdateNote";
import SharedNote from "./pages/SharedNote"; 

function App() {

  const { showNotesMenu } = useContext(DataContext);

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
      <Navbar/>
      <NotesMenu />
      <div id="main-content" style={{marginLeft: showNotesMenu ? '270px' : '0px'}}>
        <Routes>
          <Route element={<NotLoggedIn />}>
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
          <Route element={<LoggedIn />}>
            <Route exact path='/' element={<CreateNote />} />
            <Route path='/:noteId' element={<UpdateNote />} />
          </Route>
          <Route path='/shared/:shareId' element={<SharedNote />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
