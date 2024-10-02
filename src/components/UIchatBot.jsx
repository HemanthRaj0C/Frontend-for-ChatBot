import React, { useRef, useState } from "react";
import { useChat } from "../hooks/useChat";
import { useLocation, useNavigate } from "react-router-dom";

export const UIchatBot = ({ hidden, ...props }) => {
  const { logout, user } = useChat();
  const input = useRef();
  const { chatBot, loading, message } = useChat();
  const location = useLocation();
  const navigate = useNavigate();

  const isChatBotPage = location.pathname === "/chat-bot";
  const targetPath = isChatBotPage ? "/virtual-assistant" : "/chat-bot";
  const buttonLabel = isChatBotPage ? "Go to Virtual Assistant" : "Go to Chat Bot";

  const [messages, setMessages] = useState([]); // State to store chat messages

  const handleLogout = async () => {
    await logout();
    navigate('/');
    window.location.reload();
  };

  const sendMessage = async () => {
    const text = input.current.value;
    if (!loading && text.trim() !== "") {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "user", text }, 
      ]);
      
      const resp = await chatBot(text);
      if (Array.isArray(resp)) {
        setMessages((prevMessages) => [
          ...prevMessages,
          ...resp.map((msg) => ({ sender: "bot", text: msg.text })),
        ]);
      }
  
      input.current.value = ""; // Clear input after sending
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 bottom-0 z-10 flex justify-between p-4 flex-col pointer-events-none">
        <div className="self-start backdrop-blur-md bg-white bg-opacity-50 p-4 rounded-lg">
          <h1 className="font-black text-xl">My Virtual Assistant</h1>
          <p>Will always here to Help You 🌟</p>
        </div>

        {/* Buttons at the center-right */}
        <div className="w-full flex flex-col items-end justify-center gap-4">
          <button
            className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md flex items-center"
            onClick={() => {
              navigate(targetPath);
              window.location.reload();
            }}
          >
            <svg
              fill="#ffffff"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 60 60"
              className="w-6 h-6"
            >
              <path
                d="M30,1.5c-16.542,0-30,12.112-30,27c0,5.205,1.647,10.246,4.768,14.604c-0.591,6.537-2.175,11.39-4.475,13.689
                  c-0.304,0.304-0.38,0.769-0.188,1.153C0.276,58.289,0.625,58.5,1,58.5c0.046,0,0.093-0.003,0.14-0.01
                  c0.405-0.057,9.813-1.412,16.617-5.338C21.622,54.711,25.738,55.5,30,55.5c16.542,0,30-12.112,30-27S46.542,1.5,30,1.5z"
              />
            </svg>
            <span className="ml-3">{buttonLabel}</span>
          </button>

          <button
            className="pointer-events-auto bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-md"
            onClick={handleLogout}
          >
            <svg fill="#ffffff" 
              id="Capa_1" 
              xmlns="http://www.w3.org/2000/svg" 
              xmlns:xlink="http://www.w3.org/1999/xlink" 
              viewBox="0 0 384.971 384.971" 
              xml:space="preserve" 
              className="w-6 h-6">
                <g>
                  <g id="Sign_Out">
                    <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03
                      C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03
                      C192.485,366.299,187.095,360.91,180.455,360.91z"/>
                    <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279
                      c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179
                      c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z"/>
                  </g>
                </g>
              </svg>
          </button>
        </div>

        {/* Chat section at the bottom */}
        <div className="max-w-screen-sm w-full mx-auto flex flex-col gap-4 pointer-events-auto">
          
          {/* Chat Messages Display */}
            <div className="flex justify-center">
            <div className="p-4 rounded-xl shadow-2xl overflow-auto h-80 border-2 border-gray-300 w-full max-w-screen-sm mb-4 hide-scrollbar">
                {messages.map((msg, index) => (
                <div
                    key={index}
                    className={`${
                    msg.sender === "user"
                        ? "text-right text-gray-600"
                        : "text-left text-pink-500"
                    } mb-2`}
                >
                    <span className="inline-block p-2 bg-gray-100 rounded-md">
                    {msg.text}
                    </span>
                </div>
                ))}
            </div>
            </div>
          {/* Input and Send Button */}
          <div className="flex items-center gap-2">
            <input
              className="w-full placeholder:text-gray-800 placeholder:italic p-4 rounded-md bg-opacity-50 bg-white backdrop-blur-md"
              placeholder="Type a message..."
              ref={input}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              disabled={loading}
              onClick={sendMessage}
              className={`bg-pink-500 hover:bg-pink-600 text-white p-4 px-10 font-semibold uppercase rounded-md ${
                loading ? "cursor-not-allowed opacity-30" : ""
              }`}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
