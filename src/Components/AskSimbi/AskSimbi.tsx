/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./AskSimbi.css";
import { useNavigate } from "react-router-dom";

interface Message {
  sender: "user" | "ai";
  text: string;
}

interface HistoryEntry {
  date: string;
  questions: { question: string; answer: string }[];
}

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }

  interface SpeechRecognitionEvent extends Event {
    results: SpeechRecognitionResultList;
  }
}

type SpeechRecognitionType =
  | typeof window.SpeechRecognition
  | typeof window.webkitSpeechRecognition;

const AskSimbi: React.FC = () => {
  const navigate = useNavigate();
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const recognitionRef = useRef<InstanceType<SpeechRecognitionType> | null>(
    null
  );
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const [questionInput, setQuestionInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [historyVisible, setHistoryVisible] = useState(true);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    const stored = localStorage.getItem("simbiHistory");
    return stored ? JSON.parse(stored) : [];
  });

  const storedUser = localStorage.getItem("simbiUser");
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;
  const userName = parsedUser?.name || parsedUser?.given_name || "User";

  const suggestions = ["Give me a study tip", "Quiz me now", "Motivate me!"];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

<<<<<<< HEAD
  // Suggestions array
  const suggestions = [
    "Give me a study tip",
    "Quiz me now",
    "Motivate me!",
  ];

  const handleSendQuestion = async (text: string) => {
    if (!text.trim()) return;  // Prevent empty input from being sent
=======
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        const transcript = event.results[0][0].transcript;
        setQuestionInput(transcript);
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }

    return () => {
      recognitionRef.current?.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speakText = (text: string) => {
    if ("speechSynthesis" in window && text) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const utterance = new SpeechSynthesisUtterance(text);
        synthesisRef.current = utterance;

        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = (event) => {
          console.error("Speech synthesis error:", event.error);
          setIsSpeaking(false);
        };

        window.speechSynthesis.speak(utterance);
        setIsSpeaking(true);
      }
    }
  };

  const handleSendQuestion = async (text: string) => {
    if (!text.trim()) return;
>>>>>>> upstream/main

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
          model: "mistral-tiny",
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

      const today = new Date().toDateString();
      const newEntry = { question: text, answer: aiText };
      setHistory((prev) => {
        const updated = [...prev];
        const todayEntry = updated.find((entry) => entry.date === today);
        if (todayEntry) {
          todayEntry.questions.push(newEntry);
        } else {
          updated.unshift({ date: today, questions: [newEntry] });
        }
        localStorage.setItem("simbiHistory", JSON.stringify(updated));
        return updated;
      });
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

  const formatDateLabel = (dateStr: string) => {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    if (dateStr === today) return "Today";
    if (dateStr === yesterday) return "Yesterday";
    return dateStr;
  };

  const handleHistoryClick = (question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { sender: "user", text: question },
      { sender: "ai", text: answer },
    ]);
  };

  return (
    <div className="chat-container">
<<<<<<< HEAD
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
=======
      <div className="chat-wrapper">
        <div
          className="sidebar-toggle"
          onClick={() => setHistoryVisible((prev) => !prev)}
        >
          <img src="/assets/icons/Simbi-logo.svg" alt="logo" width="60%" />
          <img
            src="/assets/icons/cuida_sidebar.svg"
            alt="collapse"
            width="15%"
          />
        </div>

        {historyVisible && (
          <aside className="chat-history">
            <h2>History</h2>
            {history.map((entry, idx) => (
              <div key={idx} className="history-section">
                <strong>{formatDateLabel(entry.date)}</strong>
                <ul>
                  {entry.questions.map((q, qIdx) => (
                    <li key={qIdx}>
                      <button
                        className="history-question"
                        onClick={() => handleHistoryClick(q.question, q.answer)}
                      >
                        {q.question.length > 20
                          ? q.question.slice(0, 17) + "..."
                          : q.question}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
>>>>>>> upstream/main
            ))}
          </aside>
        )}
      </div>

      <div className="asksimbi-container">
        <div className="cancel-button-div">
          <button
            onClick={() => navigate("/quizPage")}
            className="cancel-button"
          >
            Dashboard
          </button>
        </div>

        {messages.length === 0 && (
          <div className="suggestions">
            <img
              src="/assets/icons/Simbi-logo.svg"
              className="askSimbi-image"
              alt="Logo"
              style={{ width: "9.5rem", height: "3rem" }}
            />
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
              className={`chat-bubble ${
                msg.sender === "user" ? "right" : "left"
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="chat-bubble left">Typing...</div>}
          <div ref={bottomRef} />
        </div>

        <div className="input-area">
          <textarea
            ref={textareaRef}
            rows={1}
            maxLength={500}
            value={questionInput}
            onChange={(e) => {
              setQuestionInput(e.target.value);
              if (textareaRef.current) {
                textareaRef.current.style.height = "auto";
                textareaRef.current.style.height = `${Math.min(
                  textareaRef.current.scrollHeight,
                  96
                )}px`;
              }
            }}
            placeholder="Ask SIMBI anything"
            className="chat-input"
          />
          <div className="input-buttons">
            <button
              onClick={() => handleSendQuestion(questionInput)}
              disabled={loading}
              className="send-button"
            >
              {loading ? (
                <img src="/assets/icons/block.svg" alt="block" />
              ) : (
                <img src="/assets/icons/send.svg" alt="send" />
              )}
            </button>

            <div className="two-btn">
              <button
                onClick={() => {
                  const lastMessage = [...messages]
                    .reverse()
                    .find((m) => m.sender === "ai");
                  if (lastMessage) speakText(lastMessage.text);
                }}
                disabled={!messages.some((m) => m.sender === "ai")}
                className="replay-button"
              >
                <img
                  src={
                    isSpeaking
                      ? "/assets/icons/stop_circle.svg"
                      : "/assets/icons/play.svg"
                  }
                  alt={isSpeaking ? "stop" : "play"}
                />
              </button>
              <button
                onClick={isListening ? stopListening : startListening}
                className="voice-button"
              >
                {isListening ? (
                  <img src="/assets/icons/mic_off.svg" alt="mic-off" />
                ) : (
                  <img src="/assets/icons/mic.svg" alt="mic" />
                )}
              </button>
            </div>
          </div>
        </div>
<<<<<<< HEAD
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
=======
>>>>>>> upstream/main
      </div>
    </div>
  );
};

export default AskSimbi;
