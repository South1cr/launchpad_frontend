import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input } from "antd";
import { AuthContext } from "../context/auth.context";
import { LoadingContext } from "../context/loading.context";
import { post } from "../services/authService";

const Login = () => {
  const { setUser } = useContext(LoadingContext);

  const { storeToken } = useContext(AuthContext);

  const [thisUser, setThisUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setThisUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    post("/users/login", thisUser)
      .then((results) => {
        console.log("Login", results.data);
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
        <h2>Login</h2>
      <form>
        <label>Email</label>
        <br></br>
        <Input
          type="email"
          name="email"
          value={thisUser.email}
          onChange={handleChange}
        />
        <br></br>

        <label>Password</label>
        <br></br>
        <Input
          type="password"
          name="password"
          value={thisUser.password}
          onChange={handleChange}
        />
        <br></br><br></br>

        <Button type="primary" onClick={handleSubmit}>
          Login
        </Button>

        <p>
          Don't have an account? <Link to="/signup">Signup</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
