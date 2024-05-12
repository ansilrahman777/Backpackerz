import React from "react";
import Header from "../../Components/User/Header/Header";
import Message from "../../Components/Chat/Message";
import MessageInput from "../../Components/Chat/MessageInput";

function Chat() {
  return (
    <div>
      <Header />
      <div className="flex h-full justify-center antialiased text-gray-800">
        <div className="flex flex-row h-[600px] w-3/4 overflow-x-hidden">
          <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
              <Message text="hyyy" sent='fine'/>
              <MessageInput/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
