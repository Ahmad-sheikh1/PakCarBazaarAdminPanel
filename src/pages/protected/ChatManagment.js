// Import necessary libraries
import React, { useState, useEffect } from 'react';
import { FaComment } from 'react-icons/fa';
import io from 'socket.io-client';
import { baseuRL } from "../../app/api"
import axios from 'axios';

const socket = io('http://localhost:5000'); // Update with your server URL

const Chat = () => {
  const [messages, setMessages] = useState({}); // Messages by users
  const [users, setUsers] = useState([]); // List of all users
  const [selectedChat, setSelectedChat] = useState(null);
  const [input, setInput] = useState('');
  const [user, setUser] = useState('Admin'); // Assume admin is the current user
  const [notificationCount, setNotificationCount] = useState(0);

  // Step 1: Fetch all users and messages on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(`${baseuRL}/api/userAccount/AllUsers`);
        console.log(usersResponse.data.data);

        setUsers(usersResponse.data.data);

        const messagesResponse = await axios.get(`${baseuRL}/api/Chats/admin/allmessages`);
        console.log(messagesResponse.data.data);
        setMessages(messagesResponse.data.data);
      } catch (error) {
        console.error('Error fetching users or messages:', error);
      }
    };

    fetchData();

    // Listen for new real-time messages (Step 3)
    socket.on('newMessage', (data) => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        [data.sender]: [...(prevMessages[data.sender] || []), data],
      }));
    });

    return () => {
      socket.off('newMessage');
    };
  }, []);

  // Step 2: Send admin messages
  const sendMessage = () => {
    if (input.trim()) {
      const newMessage = { sender: user, text: input };

      // Update UI optimistically
      setMessages((prevMessages) => ({
        ...prevMessages,
        [selectedChat]: [...(prevMessages[selectedChat] || []), newMessage],
      }));

      socket.emit('sendMessage', {
        toUserId: selectedChat,
        message: input,
        isAdmin: user === 'Admin',
      });

      setInput('');
    }
  };

  // Handle selecting a chat
  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
  };

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/notifications');
      const data = await response.json();
      if (data.notifications) {
        setNotificationCount(data.notifications.length);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  // Step 4: UI Enhancements
  return (
    <div className="max-w-4xl mx-auto h-screen">
      <div className="bg-white p-4 rounded-lg shadow-lg h-full">
        <div className="flex h-full">
          {/* Users List */}
          <div className="w-1/3 bg-gray-200 p-3 space-y-2 overflow-y-auto">
            <h2 className="text-lg font-semibold">Inbox</h2>
            {users?.length > 0 ? (
              users.map((user) => (
                <div
                  key={user._id}
                  onClick={() => handleSelectChat(user._id)}
                  className={`p-2 cursor-pointer rounded-lg ${user._id === selectedChat ? 'bg-blue-500 text-white' : 'bg-gray-300'
                    }`}
                >
                  {user.firstName}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No users available</p>
            )}
          </div>


          {/* Chat Section */}
          <div className="flex-1 bg-gray-100 p-4">
            <div className="h-full flex flex-col">
              <div
                className="flex-1 overflow-y-auto bg-white p-4 rounded-lg mb-4"
                style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}
              >
                {selectedChat ? (
                  messages[selectedChat] && messages[selectedChat].length > 0 ? (
                    messages[selectedChat].map((msg, index) => (
                      <div
                        key={index}
                        className={`flex mb-2 ${msg.sender === user ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`p-3 rounded-lg ${msg.sender === user
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-300 text-black'
                            }`}
                        >
                          <p className="text-sm font-semibold">{msg.sender}</p>
                          <p>{msg.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No messages in this chat</p>
                  )
                ) : (
                  <p className="text-gray-500">Select a chat to view messages</p>
                )}
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
                    onClick={fetchNotifications}
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
