import React from 'react';

function AdminMessage({ message, sender, time }) {
  return (
    <div className={`flex flex-col h-full overflow-x-auto mb-4 ${sender === 'admin' ? 'flex-row-reverse' : ''}`}>
      <div className={`grid grid-cols-12 gap-y-2 ${sender === 'admin' ? 'col-start-6 col-end-13' : 'col-start-1 col-end-8'} p-3 rounded-lg`}>
        <div className="flex flex-row items-center">
          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
            {sender[0]} {/* Display first letter of sender's name */}
          </div>
          <div className={`relative ml-3 text-sm ${sender === 'admin' ? 'bg-indigo-100' : 'bg-white'} py-2 px-4 shadow rounded-xl`}>
            <div>{message}</div>
          </div>
        </div>
        <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
          <div>{new Date(time).toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

export default AdminMessage;
