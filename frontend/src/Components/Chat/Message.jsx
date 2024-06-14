import React, { useEffect, useRef } from "react";

const Message = ({ messages, user_id }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log("user_id----", user_id);
  console.log("messages array-----", messages);
  console.log("time-----------", messages.timestamp);

  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2">
          {messages.length > 0 ? (
            messages.map((message, index) => (
              message.sender === user_id ? (
                <div key={index} className="col-start-6 col-end-13 p-3 rounded-lg">
                  <div className="flex items-center justify-start flex-row-reverse">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      R
                    </div>
                    <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                      <div>{message.message}</div>
                      <div className="text-gray-500 text-xs mt-1">{new Date(message.time_stamp).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div key={index} className="col-start-1 col-end-8 p-3 rounded-lg">
                  <div className="flex flex-row items-center">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                      S
                    </div>
                    <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                      <div>{message.message}</div>
                      <div className="text-gray-500 text-xs mt-1">{new Date(message.time_stamp).toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              )
            ))
          ) : (
            <p className="col-start-1 col-end-13 text-center text-gray-500">No messages to display</p>
          )}
          <div ref={bottomRef} className="col-start-1 col-end-13"></div>
        </div>
      </div>
    </div>
  );
};

export default Message;
