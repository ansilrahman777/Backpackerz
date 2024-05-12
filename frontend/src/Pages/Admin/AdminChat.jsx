import React ,{ useEffect, useState }from "react";
import Header from "../../Components/Admin/Header";
import AsideBar from "../../Components/Admin/AsideBar";
import ChatArea from "../../Components/Admin/chat/ChatArea";


const AdminChat = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
       
        const response = await axios.get(
          'http://127.0.0.1:8000/api/v1/admin/chat-unique-users/'
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

  console.log("=====this is the users ======", users);
  console.log("=========================selected user", selectedUser);

  useEffect(() => {
    const newSocket = new WebSocket(
      `wss://findme.siyadsavad.online/ws/chat/${selectedUser}/`
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

  console.log("=======messagesssssssssssssssssssssssss", messages);
  return (
    <div>
      <Header />
      <div className="flex">
        <AsideBar
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
  );
};

export default AdminChat;
