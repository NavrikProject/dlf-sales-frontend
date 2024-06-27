import { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Chatbot.css";

const Chatbot = ({ closeChatbotPopup }) => {
  const chatbotContentRef = useRef(null);
  const [loading, setLoading] = useState(false);
  // Function to scroll chat window to bottom
  const scrollToBottom = () => {
    if (chatbotContentRef.current) {
      chatbotContentRef.current.scrollTop =
        chatbotContentRef.current.scrollHeight;
    }
  };
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you today?", class: "bot" },
  ]);
  const [userMessage, setUserMessage] = useState("");
  // Simulate receiving bot messages from backend (replace with actual API call)
  useEffect(() => {
    // Scroll to bottom after messages update
    scrollToBottom();
    return () => clearTimeout();
  }, [messages]);
  const UserQueryHandler = async () => {
    if (userMessage.trim() === "")
      return window.alert("Please enter the message!");

    // Add user message to messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: userMessage, class: "user" },
    ]); // Clear input field after sending message
    setUserMessage("");
    // Simulate bot response (replace with actual logic)
    setLoading(true);
    try {
      const response = await axios.post(
        "https://dlfsalesbackend.azurewebsites.net/process_message",
        {
          message: userMessage,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response.data.response, class: "bot" },
        ]);
        setLoading(false);
      } else {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            text: "There was an error processing the message. Try after sometime!",
            class: "error",
          },
        ]);
        setLoading(false);
      }
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          text: "There was an error processing the message. Try again later!",
          class: "error",
        },
      ]);
      setLoading(false);
    }

    // scrollToBottom();
  };
  return (
    <div className="chatbot-popup">
      <div className="chatbot-header">
        <span>Sales Chatbot</span>
        <button className="close-btn" onClick={closeChatbotPopup}>
          &times;
        </button>
      </div>
      <div className="chatbot-content" ref={chatbotContentRef}>
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.class}`}>
            {message.text}
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="loading-indicator">
              Please wait! Loading........
            </div>
          </div>
        )}
      </div>
      <div className="chatbot-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => {
            setUserMessage(e.target.value);
          }}
        />
        {loading ? (
          <button type="" disabled>
            Send
          </button>
        ) : (
          <button type="submit" onClick={UserQueryHandler}>
            Send
          </button>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
