import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Chat from './pages/Chat';

import { ToastContainer } from 'react-toastify';

function App() {
  const [session, setSession] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const token = localStorage.getItem("token");
    setSession(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setSession(null);
  };

  return (
    <Router>
      <Navbar session={session} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setSession={setSession} />} />
        <Route path="/signup" element={<Signup setSession={setSession} />} />
        <Route
          path="/chat"
          element={session ? <Chat session={session} /> : <Navigate to="/login" />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
