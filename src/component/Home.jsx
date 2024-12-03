import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

import Login from './Login';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [societies, setSocieties] = useState([]);
  const [fyps, setFyps] = useState([]); // State for FYPs
  const navigate = useNavigate();

  // Authentication state check - always called unconditionally
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false); // Stop loading once the authentication state is known
    });
    return () => unsubscribe();
  }, []);

  // Navigation effect - redirect to home page after login
  useEffect(() => {
    if (user && window.location.pathname === '/login') {
      navigate('/'); // Redirect to Home page after login
    }
  }, [user, navigate]);

  // Fetch societies from backend
  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const response = await fetch('http://localhost:8800/api/societies'); // Your backend API
        const data = await response.json();
        setSocieties(data);
      } catch (error) {
        console.error('Error fetching societies:', error);
      }
    };
    fetchSocieties();
  }, []);

  // Fetch FYPs from backend
  useEffect(() => {
    const fetchFyps = async () => {
      try {
        const response = await fetch('http://localhost:8800/api/projects'); // Fetch FYPs from backend API
        const data = await response.json();
        setFyps(data);
      } catch (error) {
        console.error('Error fetching FYPs:', error);
      }
    };
    fetchFyps();
  }, []);

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Show a loading screen while checking authentication state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in, show the login component
  if (!user) {
    return <Login />;
  }

  // Sample data for Discussion categories (can also be fetched from backend if needed)
  const discussionCategories = [
    { image: "/images/categories/Academic Discussions.png", name: "Academic Discussions" },
    { image: "/images/categories/Extracurricular Activities.png", name: "Extracurricular Activities" },
    { image: "/images/categories/University announcement and uppdates.png", name: "University Announcement and Updates" },
    { image: "/images/categories/Career Guidance.png", name: "Career Guidance" },
    { image: "/images/categories/Campus Life.png", name: "Campus Life" },
  ];

  // Select 5 random FYPs from the shuffled array
  const randomFyps = shuffleArray(fyps).slice(0, 5);

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>Welcome to Discussion Hub</h1>
        <p>Your one-stop destination for all discussions, announcements, and more!</p>
      </header>
      
      {/* Societies Section */}
      <section className="societies">
        <h2>Societies</h2>
        <div className="society-container">
          {shuffleArray(societies).slice(0, 5).map((society, index) => (  // Shuffle and then limit to 5 societies
            <div className="society" key={index}>
              <img src={society.picture} alt={society.name} className="society-img" />
              <h3>{society.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* FYP Section */}
      <section className="fyp">
        <h2>Final Year Projects</h2>
        <div className="fyp-container">
          {randomFyps.length > 0 ? (
            randomFyps.map((fyp, index) => (
              <div className="fyp-item" key={index}>
                <img src={fyp.picture} alt={fyp.name} className="fyp-img" />
                <h3>{fyp.name}</h3>
              </div>
            ))
          ) : (
            <p>No Final Year Projects found.</p>
          )}
        </div>
      </section>

      {/* Discussion Categories Section */}
      <section className="discussion-forum">
        <h2>Discussion Forum Categories</h2>
        <div className="discussion-categories-container">
          {discussionCategories.map((category, index) => (
            <div className="discussion-category" key={index}>
              <img src={category.image} alt={category.name} className="discussion-category-img" />
              <h3>{category.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Announcements Section */}
      <section className="announcements">
        <h2>Announcements</h2>
        <p>Stay updated with the latest news and events!</p>
      </section>
    </div>
  );
};

export default Home;
