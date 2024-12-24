import React, { useState, useEffect } from 'react';
import './Discussion.css';
import io from 'socket.io-client';
import axios from 'axios'; // To make API requests

const socket = io('http://localhost:8800', {
  transports: ['websocket'],
  withCredentials: true,
});

const categories = [
  { image: "/images/categories/Academic Discussions.png", name: "Academic Discussions" },
  { image: "/images/categories/Extracurricular Activities.png", name: "Extracurricular Activities" },
  { image: "/images/categories/University announcement and updates.png", name: "Announcement and Updates" },
  { image: "/images/categories/Career Guidance.png", name: "Career Guidance" },
  { image: "/images/categories/Campus Life.png", name: "Campus Life" },
];

const Discussion = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [username, setUsername] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('');
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showChatRoom, setShowChatRoom] = useState(false);

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchMessages(category.name); // Fetch messages when category is selected
  };

  // Fetch messages for the selected category
  const fetchMessages = async (categoryName) => {
    try {
      const encodedCategoryName = encodeURIComponent(categoryName);  // Encode the category name to handle special characters
      const response = await axios.get(`http://localhost:8800/api/discussions/${encodedCategoryName}`);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  // Handle avatar selection
  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar);
  };

  // Start chat with username and avatar
  const handleStartDiscussion = () => {
    if (username && selectedAvatar) {
      socket.emit('joinRoom', { username, avatar: selectedAvatar, category: selectedCategory.name });
      setShowChatRoom(true);
    } else {
      alert("Please select a username and avatar.");
    }
  };

  // Handle sending messages
  const handleSendMessage = async () => {
    if (messageInput) {
      const messageData = {
        message: messageInput,
        username,
        avatar: selectedAvatar,
        category: selectedCategory.name,
      };

      // Emit message via socket and also send to backend
      socket.emit('chatMessage', messageData);
      
      // Post message to backend
      try {
        await axios.post('http://localhost:8800/api/discussions', messageData);
        setMessageInput(''); // Clear input after sending
      } catch (error) {
        console.error("Error posting message:", error);
      }
    }
  };

  // Listen for incoming messages from socket
  useEffect(() => {
    socket.on('chatMessage', (message) => {
      // Append the new message immediately when received
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Cleanup socket listener when component is unmounted
    return () => {
      socket.off('chatMessage');
    };
  }, []);

  return (
    <div className="discussion-page">
      <h1>Discussion Forum</h1>

      {/* Category Selection */}
      {!showChatRoom && !selectedCategory && (
        <div className="categories">
          {categories.map((category, index) => (
            <div key={index} className="category-card" onClick={() => handleCategorySelect(category)}>
              <img src={category.image} alt={category.name} className="category-image" />
              <h2>{category.name}</h2>
            </div>
          ))}
        </div>
      )}

      {/* Avatar and Username Selection */}
      {selectedCategory && !showChatRoom && (
        <div className="avatar-selection">
          <h2>Choose Your Avatar for {selectedCategory.name}</h2>
          <div className="avatars">
            <img src="/images/avatars/avatar1.png" alt="Avatar 1" onClick={() => handleAvatarSelect('avatar1')} />
            <img src="/images/avatars/avatar2.png" alt="Avatar 2" onClick={() => handleAvatarSelect('avatar2')} />
            <img src="/images/avatars/avatar3.png" alt="Avatar 3" onClick={() => handleAvatarSelect('avatar3')} />
          </div>
          <input
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleStartDiscussion}>Start Discussion</button>
        </div>
      )}

      {/* Chat Room */}
      {showChatRoom && (
        <div className="chat-room">
          <h2>Chat in {selectedCategory.name}</h2>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">
                <img src={`/images/avatars/${msg.avatar}.png`} alt={msg.username} className="avatar" />
                <p><strong>{msg.username}:</strong> {msg.message}</p>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
