import React, { useState, useEffect, useContext } from 'react';
import './Discussion.css';
import io from 'socket.io-client';
import axios from 'axios';
import { AuthContext } from '../../authContext/AuthContext';

const socket = io('http://localhost:8800', {
  transports: ['websocket'],
  withCredentials: true,
});

const categories = [
  { image: '/images/categories/Academic Discussions.png', name: 'Academic Discussions' },
  { image: '/images/categories/Extracurricular Activities.png', name: 'Extracurricular Activities' },
  { image: '/images/categories/University announcement and uppdates.png', name: 'Announcement and Updates' },
  { image: '/images/categories/Career Guidance.png', name: 'Career Guidance' },
  { image: '/images/categories/Campus Life.png', name: 'Campus Life' },
];

const Discussion = () => {
  const { user } = useContext(AuthContext);  // Get user from context
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [isSendingMessage, setIsSendingMessage] = useState(false);
  const [setupComplete, setSetupComplete] = useState(false);

  const avatarFromContext = user?.avatar || selectedAvatar;  // Get user's avatar or selected avatar

  // Handle avatar setup
  const handleStartSetup = () => {
    if (selectedAvatar || avatarFromContext) {
      setSetupComplete(true);
    } else {
      alert('Please select an avatar.');
    }
  };

  // Handle category selection
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    fetchMessages(category.name);
    socket.emit('joinRoom', { username: user?.username, avatar: avatarFromContext, category: category.name });
    setShowChatRoom(true);
  };

  // Fetch messages for the selected category
  const fetchMessages = async (categoryName) => {
    try {
      const encodedCategoryName = encodeURIComponent(categoryName);
      const response = await axios.get(`http://localhost:8800/api/discussions/${encodedCategoryName}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  // Handle sending messages
  const handleSendMessage = () => {
    if (messageInput && !isSendingMessage) {
      setIsSendingMessage(true);
      const messageData = {
        message: messageInput,
        username: user?.username,  // Add username
        avatar: avatarFromContext, // Use selected or default avatar
        category: selectedCategory.name,
      };
      socket.emit('chatMessage', messageData);
      setMessageInput('');
      setIsSendingMessage(false);
    }
  };

  // Listen for incoming messages from socket
  useEffect(() => {
    socket.on('chatMessage', (message) => {
      // Avoid adding the same message multiple times
      setMessages((prevMessages) => {
        const isDuplicate = prevMessages.some((msg) => msg.message === message.message && msg.username === message.username);
        if (isDuplicate) {
          return prevMessages; // Do not add the duplicate message
        }
        return [...prevMessages, message]; // Add the new message
      });
    });

    return () => {
      socket.off('chatMessage');
    };
  }, []);

  // Handle "Enter" key press for sending messages
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && messageInput) {
      handleSendMessage();
    }
  };

  return (
    <div className="discussion-page">
      <h1>Discussion Forum</h1>

      {/* Avatar Setup */}
      {!setupComplete && (
        <div className="setup-screen">
          <h2>Choose Your Avatar</h2>
          <div className="avatars">
            {['avatar1', 'avatar2', 'avatar3', 'avatar4', 'avatar5', 'avatar6'].map((avatar) => (
              <img
                key={avatar}
                src={`/images/avatars/${avatar}.png`}
                alt={avatar}
                onClick={() => setSelectedAvatar(avatar)}
                className={selectedAvatar === avatar ? 'selected-avatar' : ''}
              />
            ))}
          </div>
          <button onClick={handleStartSetup} className="start-button">
            Start
          </button>
        </div>
      )}

      {/* Category Selection */}
      {setupComplete && !showChatRoom && (
        <div className="categories">
          {categories.map((category, index) => (
            <div
              key={index}
              className="category-card"
              onClick={() => handleCategorySelect(category)}
            >
              <img src={category.image} alt={category.name} className="category-image" />
              <h2>{category.name}</h2>
            </div>
          ))}
        </div>
      )}

      {/* Chat Room */}
      {showChatRoom && (
        <div className="chat-room">
          <h2>Chat in {selectedCategory.name}</h2>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`chat-message ${msg.username === user?.username ? 'sent' : 'received'}`}>
                <img src={`/images/avatars/${msg.avatar}.png`} alt={msg.avatar} className="avatar" />
                <div className="message-content">
                  <span className="username">{msg.username}</span>
                  <p>{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="chat-input">
            <input
              type="text"
              value={messageInput}
              onChange={(e) => setMessageInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={handleKeyDown}
            />
            <button onClick={handleSendMessage} disabled={isSendingMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Discussion;
