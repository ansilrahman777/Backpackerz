import React from 'react'
import Sidebar from './Sidebar'
import Message from './Message'
import MessageInput from './MessageInput'

function ChatArea() {
  return (
    <div className="flex h-screen  antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <Sidebar/>
            <div className="flex h-full justify-center antialiased text-gray-800">
              <div className="flex flex-row h-[600px] w-full overflow-x-hidden">
                <div className="flex flex-col flex-auto h-full p-6">
                  <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                    <div className="flex flex-col h-full w-full overflow-x-auto mb-4">
                      <Message text='hyy' sent='hello'/>
                      <MessageInput />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
  )
}

export default ChatArea