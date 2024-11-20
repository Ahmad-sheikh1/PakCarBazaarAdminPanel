import React, { useState } from 'react';
import { FaComment } from 'react-icons/fa';

const Chat = () => {
  const [messages, setMessages] = useState({
    'Friend 1': [{ sender: 'Friend 1', text: 'Hey, how are you?' }],
    'Friend 2': [{ sender: 'Friend 2', text: 'Hello! What\'s up?' }],
  });
  const [selectedChat, setSelectedChat] = useState('Friend 1');
  const [input, setInput] = useState('');
  const [user, setUser] = useState('You');
  const [notificationCount, setNotificationCount] = useState(0);

  // Function to send the message and fetch notifications
  const sendMessage = async () => {
    if (input.trim()) {
      // Update messages with the new message
      setMessages(prevMessages => ({
        ...prevMessages,
        [selectedChat]: [
          ...prevMessages[selectedChat],
          { sender: user, text: input },
        ],
      }));
      setInput(''); // Clear the input field

      try {
        // Send message API (just an example, adapt as needed)
        const response = await fetch('https://api.example.com/sendMessage', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ sender: user, text: input }),
        });

        if (response.ok) {
          console.log('Message sent successfully');
        } else {
          console.error('Error sending message');
        }

        // After sending the message, fetch notifications
        fetchNotifications();
      } catch (error) {
        console.error('Error sending message or fetching notifications:', error);
      }
    }
  };

  // Function to fetch notifications from the API
  const fetchNotifications = async () => {
    try {
      const response = await fetch('https://api.example.com/notifications');
      const data = await response.json();
      if (data.notifications) {
        setNotificationCount(data.notifications.length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Function to handle selecting a chat
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  // Function to handle notification click
  const handleNotificationClick = () => {
    fetchNotifications();
  };

  return (
    <div className="max-w-4xl mx-auto h-screen">
      <div className="bg-white p-4 rounded-lg shadow-lg h-full">
        <div className="flex h-full">
          <div className="w-1/3 bg-gray-200 p-3 space-y-2 overflow-y-auto">
            <h2 className="text-lg font-semibold">Inbox</h2>
            {Object.keys(messages).map((chat) => (
              <div
                key={chat}
                onClick={() => handleSelectChat(chat)}
                className={`p-2 cursor-pointer rounded-lg ${
                  chat === selectedChat ? 'bg-blue-500 text-white' : 'bg-gray-300'
                }`}
              >
                {chat}
              </div>
            ))}
          </div>

          <div className="flex-1 bg-gray-100 p-4">
            <div className="h-full flex flex-col">
              <div
                className="flex-1 overflow-y-auto bg-white p-4 rounded-lg mb-4"
                style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
              >
                {messages[selectedChat].map((msg, index) => (
                  <div
                    key={index}
                    className={`flex mb-2 ${msg.sender === user ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`p-3 rounded-lg ${
                        msg.sender === user ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                      }`}
                    >
                      <p className="text-sm font-semibold">{msg.sender}</p>
                      <p>{msg.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={sendMessage}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Send
                </button>

                <div className="relative">
                  <button
                    onClick={handleNotificationClick}
                    className="p-2 bg-gray-300 rounded-full hover:bg-gray-400"
                  >
                    <FaComment className="w-6 h-6 text-gray-600" />
                    {notificationCount > 0 && (
                      <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
                        {notificationCount}
                      </span>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;