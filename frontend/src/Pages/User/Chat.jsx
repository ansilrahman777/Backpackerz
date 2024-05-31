import React, { useEffect, useState } from "react";
import Header from "../../Components/User/Header/Header";
import Message from "../../Components/Chat/Message";
import MessageInput from "../../Components/Chat/MessageInput";

function Chat() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user id--", user.user_id);

  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(
      `ws://localhost:8000/ws/chat/${user.user_id}/`
    );

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
  }, []);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message }));
    }
    console.log(messages);
  };

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
