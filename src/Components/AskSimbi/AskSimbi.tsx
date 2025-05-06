import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AskSimbi.css";
import { useNavigate } from "react-router-dom";



interface Message {
  sender: "user" | "ai";
  text: string;
}

const AskSimbi: React.FC = () => {
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [questionInput, setQuestionInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);
  

  const suggestions = [
    "Give me a study tip",
    "Quiz me now",
    "Motivate me!",
  ];

  const handleSendQuestion = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { sender: "user", text };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setQuestionInput("");
    setLoading(true);

    try {
      const mistralMessages = [
        {
          role: "system",
          content: "You are a helpful AI study assistant named SIMBI.",
        },
        ...updatedMessages.map((msg) => ({
          role: msg.sender === "user" ? "user" : "assistant",
          content: msg.text,
        })),
      ];

      const res = await axios.post(
        "https://api.mistral.ai/v1/chat/completions",
        {
          model: "mistral-tiny", // or mistral-small / mistral-medium
          messages: mistralMessages,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      );

      const aiText = res.data.choices?.[0]?.message?.content ?? "No response received.";
      const aiMessage: Message = { sender: "ai", text: aiText };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Mistral API error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "ai", text: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const storedUser = localStorage.getItem("simbiUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = parsedUser?.name || parsedUser?.given_name || "User";


  return (
    <div className="chat-container">
      {/* <h2 className="chat-title">Ask SIMBI</h2> */}

      {messages.length === 0 && (
        <div className="suggestions">
          <img src="/assets/askSimbi-image.svg" className="askSimbi-image" alt="Logo" style={{width: "9.5rem", height: "3rem"}}/>
          <p className="greeting">
            Hi {userName} 👋!
          </p>

          <h6>How can I help you?</h6>
          <div className="suggestionBox">
          {suggestions.map((suggestion, idx) => (
            <button
              key={idx}
              className="suggestion-button"
              onClick={() => handleSendQuestion(suggestion)}
            >
              {suggestion}
            </button>
          ))}
          </div>
        </div>
      )}

      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`chat-bubble ${msg.sender === "user" ? "right" : "left"}`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-bubble left">Typing...</div>}
        <div ref={bottomRef} />
      </div>

      <div className="input-area">
        <textarea
          rows={(0.2 / 100) * window.innerHeight}
          cols={(0.5 / 100) * window.innerWidth}
          maxLength={500}
          value={questionInput}
          onChange={(e) => setQuestionInput(e.target.value)}
          placeholder="Ask SIMBI anything"
          className="chat-input"
        />
        </div>
        <div className="input-buttons">
          <button
            onClick={() => navigate("")} // Adjust to your actual dashboard route
            className="cancel-button"
          >
            Cancel
          </button>

          <button
            onClick={() => handleSendQuestion(questionInput)}
            disabled={loading}
            className="send-button"
          >
            {loading ? "Asking..." : "Ask SIMBI"}
          </button>
        </div>
      
    </div>
  );
};

export default AskSimbi;
// Note: Ensure to replace the API URL and headers with the correct ones for your Mistral API setup.
// Also, make sure to handle the API key securely and not expose it in the client-side code.