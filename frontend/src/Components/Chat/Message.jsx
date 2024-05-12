import React from "react";

function Message({ text, sent }) {
  return (
    <div className="flex flex-col h-full overflow-x-auto mb-4">
      <div className="flex flex-col h-full">
        <div className="grid grid-cols-12 gap-y-2">
          <div className="col-start-1 col-end-8 p-3 rounded-lg">
            <div className="flex flex-row items-center">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                A
              </div>
              <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                <div>{text}</div>
              </div>
            </div>
          </div>
          <div className="col-start-6 col-end-13 p-3 rounded-lg">
            <div className="flex items-center justify-start flex-row-reverse">
              <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                A
              </div>
              <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                <div>{sent}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Message;
