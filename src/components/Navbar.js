import { Link } from "react-router-dom";
import { Button } from "antd";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import { DataContext } from "../context/data.context";

const Navbar = ({ menuOnClick, menuActive }) => {
  const { user, toggleMenu, showNotesMenu} = useContext(DataContext);
  const { logOutUser } = useContext(AuthContext);

  return (
    <nav id="navbar">
      <div>
        <Button
          id="nav-menu"
          className={showNotesMenu ? "active" : ""}
          onClick={toggleMenu}
          type="text"
        >
          <i className="fa-solid fa-bars navbar-icon"></i>
        </Button>
      </div>
      <div>
        <Link to="/" className="link-no-decoration">
          <h3>
            launchPad&emsp;
            <i className="fa-brands fa-space-awesome navbar-icon"></i>
          </h3>
        </Link>
      </div>
      <div>
        {user && (
          <Button onClick={logOutUser} type="text" title="logout">
            <i className="fa-solid fa-right-from-bracket navbar-icon"></i>
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
