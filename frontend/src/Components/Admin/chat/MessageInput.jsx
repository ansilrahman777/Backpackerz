import React, { useEffect, useState } from 'react'



const MessageInput = ({ sendMessage, socket }) => {
const {user, userInfo} = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch()
  
  useEffect(() => {
    // Dispatch the getUserInfo action when the component mounts
    if (user) {
      dispatch(getUserInfo());
    }
  }, [dispatch, user]);

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleSend = () => {
    if (message.trim() !== '') {
      console.log(userInfo.id);
      console.log('----------------------------');
      const formattedMessage = {
          "message": message,
          "sender": userInfo.id 
      };
      sendMessage(formattedMessage, socket); // Send message only if it's not empty
      setMessage('');
    }
  };

  console.log("=========admin==================id", userInfo.id);
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Type your Message"
            value={inputValue}
            onChange={handleChange}
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />
        </div>
      </div>
      <div className="ml-4">
        <button
          className="flex items-center justify-center bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
          onClick={handleSend}
        >
          <span>Send</span>
          <span className="ml-2">
            <svg
              className="w-4 h-4 transform rotate-45 -mt-px"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </span>
        </button>
      </div>
    </div>
  );
}

export default MessageInput;
