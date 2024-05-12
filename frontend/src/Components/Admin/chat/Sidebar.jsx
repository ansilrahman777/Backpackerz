import React from "react";

function Sidebar({ users, selectedUser, setSelectedUser }) {
  return (
    <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
      <div className="flex flex-col mt-8">
        <p className="text-2xl font-semibold font-mono">Users</p>
        <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48">
          <ul>
            {users.map((user) => (
              <li
                key={user.id}
                className={`${selectedUser === user.id ? "active" : ""} ${
                  user.isOnline ? "online" : "offline"
                }`}
                onClick={() => setSelectedUser(user.id)}
              >
                {user.email} {user.isOnline ? "(Online)" : "(Offline)"}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
