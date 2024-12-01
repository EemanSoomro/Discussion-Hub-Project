import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import { useNavigate } from 'react-router-dom';

import Login from './Login';
import './Home.css';

const Home = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
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

  // Show a loading screen while checking authentication state
  if (loading) {
    return <div>Loading...</div>;
  }

  // If user is not logged in, show the login component
  if (!user) {
    return <Login />;
  }

  // Sample data
  const societies = [
    { image: "/images/societies/Art.png", name: "Art Society" },
    { image: "/images/societies/music.png", name: "Music Society" },
    { image: "/images/societies/IEEE.png", name: "IEEE Society" },
    { image: "/images/societies/Sport.png", name: "Sports Society" },
    { image: "/images/societies/marketing.png", name: "Marketing Society" },
  ];

  const fyps = [
    { image: "/images/fyps/Android AI diet plan project.png", name: "Android AI diet plan project" },
    { image: "/images/fyps/quran for blind.png", name: "Quran for blind" },
    { image: "/images/fyps/Android Based Sceurity and Emergency Alert system using CCTV cameras.png", name: "Android Based Security and Emergency Alert system" },
    { image: "/images/fyps/Music Recommender System Android Application.png", name: "Music Recommender System Android Application" },
    { image: "/images/fyps/Layout Code Generator by using AI techniques.png", name: "Layout Code Generator using AI" },
  ];

  const discussionCategories = [
    { image: "/images/categories/Academic Discussions.png", name: "Academic Discussions" },
    { image: "/images/categories/Extracurricular Activities.png", name: "Extracurricular Activities" },
    { image: "/images/categories/University announcement and uppdates.png", name: "University Announcement and Uppdates" },
    { image: "/images/categories/Career Guidance.png", name: "Career Guidance" },
   {image: "/images/categories/Campus Life.png", name: "Campus Life" },
  
  ];

  return (
    <div className="home-container">
     
      <header className="home-header">
        <h1>Welcome to General Hub</h1>
        <p>Your one-stop destination for all discussions, announcements, and more!</p>
      </header>
      <section className="societies">
        <h2>Societies</h2>
        <div className="society-container">
          {societies.map((society, index) => (
            <div className="society" key={index}>
              <img src={society.image} alt={society.name} className="society-img" />
              <h3>{society.name}</h3>
            </div>
          ))}
        </div>
      </section>
      <section className="fyp">
        <h2>Final Year Projects</h2>
        <div className="fyp-container">
          {fyps.map((fyp, index) => (
            <div className="fyp-item" key={index}>
              <img src={fyp.image} alt={fyp.name} className="fyp-img" />
              <h3>{fyp.name}</h3>
            </div>
          ))}
        </div>
      </section>
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
      <section className="announcements">
        <h2>Announcements</h2>
        <p>Stay updated with the latest news and events!</p>
      </section>
    </div>
  );
};

export default Home;
