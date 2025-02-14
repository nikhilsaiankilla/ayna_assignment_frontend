import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setSession }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const response = await axios.post("https://ayna-assignment-backend-9du3.onrender.com/api/auth/local", {
        identifier: email,
        password,
      });

      const token = response.data.jwt;
      localStorage.setItem("token", token);
      setSession(token);
      toast.success("login successfull")
      navigate('/chat');
    } catch (error) {
      toast.error('something went wrong!')
      console.error("Login error:", error.response?.data?.error?.message || "Login failed");
      setError(error.response?.data?.error?.message || "Login failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("All fields are required");
      return;
    }
    await handleLogin(email, password);
  };

  return (
    <>
      <div className="container">
        <div className="signup-box">
          <h2>Login</h2>
          {error && <p className="error-message">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Name</label>
              <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="input-group">
              <label>password</label>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button type="submit">Login</button>
          </form>
          <p className="signup-link">
            Don't have an account? <a href="/signup">Signup</a>
          </p>
        </div>
      </div>
    </>

  );
};

export default Login;
