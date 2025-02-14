import React, { useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password) {
      toast.error("all fields required")
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid Email Format")
      return;
    }

    if (password.length < 6) {
      toast.error("Password atleast contain 6 characters")
      return;
    }

    const result = await handleSignup(name, email, password);

  if (result.error) {
    toast.error('something went wrong while creating user!')
    setError(result.error);
  } else {
    toast.success('user created successfully enjay the Ai chatbot')
    navigate('/chat');
  }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const response = await axios.post("https://ayna-assignment-backend-9du3.onrender.com/api/auth/local/register", {
        username: name,
        email: email,
        password: password,
      });
  
      return response.data; 
    } catch (error) {
      return { error: error.response?.data?.error?.message || "Signup failed" };
    }
  };

  return (
    <div className="container">
      <div className="signup-box">
        <h2>Signup</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Name</label>
            <input 
              type="text" 
              placeholder="Enter your name" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)}
              required 
            />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input 
              type="password" 
              placeholder="Enter your password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="button">Sign Up</button>
        </form>
        <p className="signup-link">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;