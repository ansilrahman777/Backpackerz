import React from "react";
import { useState } from "react";

const MessageInput = ({sendMessage}) => {
  const user = JSON.parse(localStorage.getItem("user"));  
  const [message, setMessage] = useState('');
  console.log("message--",message);

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSend = () => {
      if (message.trim() !== '') {
        const messageData = {
          "message": message,
          "sender": user.user_id
        };
        sendMessage(messageData); // Send message only if it's not empty
        setMessage('');
      }
    
  };
  
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type your Message"
            value={message}
            onChange={handleChange}
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
        </div>
      </div>
      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          onClick={handleSend}
        >
          <span>Send</span>
          <span className="ml-2">
            <svg
              className="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
