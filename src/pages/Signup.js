import { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Input, Alert } from "antd";
import { AuthContext } from "../context/auth.context";
import { DataContext } from "../context/data.context";

import { post } from "../services/authService";

const Signup = () => {
  const { setUser } = useContext(DataContext);

  const { storeToken } = useContext(AuthContext);

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    post("/users/signup", newUser)
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
      <h2>Sign Up</h2>
      {error && (
        <>
          <Alert message={error} type="error" />
          <br></br>
        </>
      )}
      <form>
        <label>Email</label>
        <br></br>
        <Input
          type="email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
        />
        <br></br>

        <label>Password</label>
        <br></br>
        <Input
          type="password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
        />
        <br></br>
        <br></br>

        <Button type="primary" onClick={handleSubmit} loading={loading}>
          Signup
        </Button>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
