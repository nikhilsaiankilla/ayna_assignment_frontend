import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { FaLocationArrow } from "react-icons/fa6";

const socket = io("https://ayna-assignment-backend-9du3.onrender.com"); 

const Chat = ({ session }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatMessagesRef = useRef(null);

  if (!session) {
    alert("Please login/signup to chat");
  }

  useEffect(() => {
    socket.on("receiveMessage", (message) => {
      setMessages((prev) => [...prev, message]);
    });
    
    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  
  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "You" };

    setMessages((prev) => [...prev, newMessage]); 
    socket.emit("sendMessage", newMessage);

    setInput(""); 
  };

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat-box">
        <div className="chat-header">
          <img src="./image.webp" alt="Server" />
          AI Chatbot
        </div>
        <div className="chat-messages" ref={chatMessagesRef}>
          {messages.length === 0 ? (
            <p className="no-messages">No messages yet...</p>
          ) : (
            messages.map((msg, index) => (
              <div className="message-box">
                <div
                  key={index}
                  className={`message-text ${msg.sender === "You" ? "sent" : "received"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))
          )}
        </div>
        <form className="chat-input-box" onSubmit={handleSend}>
          <input
            type="text"
            placeholder="Type a message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="chat-input"
          />
          <button type="submit" className="chat-send-btn">
          <FaLocationArrow />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
