import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/User/Header/Header";
import Message from "../../Components/Chat/Message";
import MessageInput from "../../Components/Chat/MessageInput";
import { toast } from "react-toastify";

function Chat() {
  const base_url_chat = import.meta.env.VITE_REACT_APP_BASE_URL_CHAT_CONFIG;
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate("/login");
      toast.success("Login to chat");
      return;
    }

    const newSocket = new WebSocket(base_url_chat + `/${user.user_id}/`);

    newSocket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    newSocket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prevMessages) => [...prevMessages, message]);
    };

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [user?.user_id, navigate, base_url_chat]);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message }));
    }
    console.log(messages);
  };

  if (!user) {
    return null;
  }

  return (
    <div>
      <Header />
      <div className="flex h-full justify-center antialiased text-gray-800">
        <div className="flex flex-row h-[600px] w-3/4 overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <Message messages={messages} user_id={user.user_id} />
              <MessageInput sendMessage={sendMessage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
