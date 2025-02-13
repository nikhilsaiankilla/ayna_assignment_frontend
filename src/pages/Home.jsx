import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();


  return (
    <div className="container padding">
      <h2>Welcome to My Chat App</h2>
      <p>
        Experience real-time conversations with our AI-powered chatbot, built using
        Gemini 2.0 Flash and WebSockets for seamless communication.
      </p>
      <button className="button" onClick={() => navigate('/chat')}>Get Started</button>
    </div>

  );
};

export default Home;
