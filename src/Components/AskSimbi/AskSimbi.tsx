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
  const textareaRef = useRef<HTMLTextAreaElement | null>(null); // Ref to the textarea
  const [questionInput, setQuestionInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  // Auto-scroll when messages or loading state changes
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Suggestions array
  const suggestions = [
    "Give me a study tip",
    "Quiz me now",
    "Motivate me!",
  ];

  const handleSendQuestion = async (text: string) => {
    if (!text.trim()) return;  // Prevent empty input from being sent

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

      // Define the expected response type
      interface MistralResponse {
        choices?: { message?: { content?: string } }[];
      }
      
      const aiText = (res.data as MistralResponse).choices?.[0]?.message?.content ?? "No response received.";
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

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setQuestionInput(e.target.value);

    // Dynamically adjust the height of the textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset the height to auto to shrink when text is deleted
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set the height to the scroll height of the content
    }
  };

  return (
    <div className="chat-container">
      {messages.length === 0 && (
        <div className="suggestions">
          <img src="/assets/askSimbi-image.svg" className="askSimbi-image" alt="Logo" style={{ width: "9.5rem", height: "3rem" }} />
          <p className="greeting">Hi {userName} 👋!</p>
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
          ref={textareaRef} // Attach the ref
          rows={1}
          maxLength={500}
          value={questionInput}
          onChange={handleTextareaChange}
          placeholder="Ask SIMBI anything"
          className="chat-input"
        />
      </div>

      <div className="input-buttons">
        <button
          onClick={() => navigate("/dashboard")} // Adjust to your actual dashboard route
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
