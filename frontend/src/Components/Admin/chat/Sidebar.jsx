import React from "react";

function Sidebar({ users, selectedUser, setSelectedUser }) {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-80 bg-white flex-shrink-0">
      <div className="flex flex-col ">
        <div className="flex flex-row items-center justify-between text-xs">
          <span className="text-lg font-semibold">Active Conversations</span>
          {/* <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
            4
          </span> */}
        </div>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-screen ">
          <button className="flex flex-col items-start bg-stone-200 rounded-xl p-2">
            {users.map((user) => (
              <div
                key={user.id}
                className={`flex flex-row items-start ${
                  selectedUser === user.id ? "active" : ""
                } ${
                  user.isOnline ? "online" : "offline"
                } hover:bg-gray-100 rounded-xl p-2`}
                onClick={() => setSelectedUser(user.id)}
              >
                <div className="flex items-center justify-center h-6 w-6 bg-indigo-200 rounded-full">
                  {user.email.charAt(0).toUpperCase()}
                </div>
                <div className="ml-2 text-sm text-left font-semibold flex items-center justify-between w-full">
                  {/* <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      user.isOnline ? "bg-green-500" : "bg-red-500"
                    }`}
                    ></div> */}
                    <span>{user.email}</span>
                </div>
              </div>
            ))}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
