import React, { useEffect, useState } from "react";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import axios from "axios";
import Sidebar from "../../Components/Admin/chat/Sidebar";
import ChatArea from "../../Components/Admin/chat/ChatArea";

const AdminChat = () => {
  const base_url=import.meta.env.VITE_REACT_APP_BASE_URL_CONFIG
  const base_url_chat=import.meta.env.VITE_REACT_APP_BASE_URL_CHAT_CONFIG

  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await axios.get(
          base_url+"/api/admin_side/chat-unique-users/"
        );
        setUsers(
          response.data.map((user) => ({
            ...user,
            isOnline: user.is_online,
          }))
        );
      } catch (error) {
        console.error("Error fetching unique users:", error);
      }
    };
    fetchChatUsers();
  }, []);

  console.log("users list --", users);
  console.log("selected user --", selectedUser);

  useEffect(() => {
    const newSocket = new WebSocket(
      base_url_chat+`/${selectedUser}/`
    );
    console.log("-------------------");
    console.log(newSocket);
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
  }, [selectedUser]);

  console.log("messages ---- ", messages);

  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar />
        <div className="flex">
          <Sidebar
            messages={messages}
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
            users={users}
          />
          <ChatArea
            messages={messages}
            selectedUser={selectedUser}
            socket={socket}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminChat;
