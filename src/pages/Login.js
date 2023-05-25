import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Alert } from "antd";
import { AuthContext } from "../context/auth.context";
import { DataContext } from "../context/data.context";
import { post } from "../services/authService";

const Login = () => {
  const { setUser } = useContext(DataContext);

  const { storeToken } = useContext(AuthContext);

  const [thisUser, setThisUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setThisUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    post("/users/login", thisUser)
      .then((results) => {
        storeToken(results.data.authToken);
        setUser(results.data.user);
        navigate("/");
      })
      .catch((err) => {
        try {
          setError(err.response.data.message);
        } catch {
          console.log('Unhandled error', err);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <h2>Login</h2>
      {error && (
        <>
          <Alert message={error} banner type="error" showIcon/>
          <br></br>
        </>
      )}
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
        <br></br>
        <br></br>
        <Button type="primary" onClick={handleSubmit} loading={loading}>
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
