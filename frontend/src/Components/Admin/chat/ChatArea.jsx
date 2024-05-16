import React from "react";

import MessageInput from "./MessageInput";

function ChatArea({ messages, selectedUser, socket }) {
  const sendMessage = (message, socket) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify({ message }));
    }
    console.log(messages);
  };

  return (
    <div className="flex h-screen w-[800px]">
      <div className="flex flex-row h-full w-full overflow-x-hidden">
        <div className="flex h-full justify-center text-gray-800 w-full">
          <div className="flex flex-row h-[600px] w-full">
            <div className="flex flex-col flex-auto h-full p-6 w-full">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4 w-full">
                <div className="flex flex-col h-full w-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                      <div className="grid grid-cols-12 gap-y-2">
                        {messages && messages.length > 0 ? (
                          messages.map((message, index) => (
                            <div
                              key={index}
                              className={`col-start-${
                                message.sender === selectedUser ? "1" : "6"
                              } col-end-${
                                message.sender === selectedUser ? "8" : "13"
                              } p-3 rounded-lg admin-message ${
                                message.sender === selectedUser
                                  ? "received"
                                  : "sent"
                              }`}
                            >
                              <div
                                className={`flex items-center ${
                                  message.sender === selectedUser
                                    ? ""
                                    : "justify-start flex-row-reverse"
                                }`}
                              >
                                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                  {message.sender === selectedUser ? "U" : "A"}
                                </div>
                                <div
                                  className={`relative ${
                                    message.sender === selectedUser
                                      ? "ml-3"
                                      : "mr-3"
                                  } text-sm ${
                                    message.sender === selectedUser
                                      ? "bg-white"
                                      : "bg-indigo-100"
                                  } py-2 px-4 shadow rounded-xl admin-message-bubble`}
                                >
                                  <div>{message.message}</div>
                                  <div className="text-gray-500 text-xs mt-1">
                                    {new Date(
                                      message.time_stamp
                                    ).toLocaleString()}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="col-start-1 col-end-13 text-center text-gray-500">
                            No messages to display
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <MessageInput sendMessage={sendMessage} socket={socket} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChatArea;
