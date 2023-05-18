import { useContext, useState } from "react";

import { useNavigate, Link } from "react-router-dom";

import { AuthContext } from "../context/auth.context";
import { LoadingContext } from "../context/loading.context";

import { post } from "../services/authService";

const Signup = () => {
  const { setUser } = useContext(LoadingContext);

  const { storeToken } = useContext(AuthContext);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/users/signup", newUser)
      .then((results) => {
        console.log("Signup", results.data);
        storeToken(results.data.authToken);
        setUser(results.data.user);
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>email</label><br></br>
        <input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
        /><br></br>

        <label>password</label><br></br>
        <input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
        /><br></br>

        <button type="submit">Signup</button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
