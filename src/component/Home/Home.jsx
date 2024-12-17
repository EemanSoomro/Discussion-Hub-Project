import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [societies, setSocieties] = useState([]);
  const [fyps, setFyps] = useState([]); // State for FYPs

  // Fetch societies from backend
  useEffect(() => {
    const fetchSocieties = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/societies"); // Your backend API
        if (response.ok) {
          const data = await response.json();
          setSocieties(data);
        } else {
          console.error("Error fetching societies:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching societies:", error);
      }
    };
    fetchSocieties();
  }, []);

  // Fetch FYPs from backend
  useEffect(() => {
    const fetchFyps = async () => {
      try {
        const response = await fetch("http://localhost:8800/api/projects"); // Fetch FYPs from backend API
        if (response.ok) {
          const data = await response.json();
          setFyps(data);
        } else {
          console.error("Error fetching FYPs:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching FYPs:", error);
      }
    };
    fetchFyps();
  }, []);

  // Function to shuffle an array randomly
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);
  };

  // Sample data for Discussion categories (can also be fetched from backend if needed)
  const discussionCategories = [
    {
      image: "/images/categories/Academic Discussions.png",
      name: "Academic Discussions",
    },
    {
      image: "/images/categories/Extracurricular Activities.png",
      name: "Extracurricular Activities",
    },
    {
      image: "/images/categories/University announcement and uppdates.png",
      name: "University Announcement and Updates",
    },
    {
      image: "/images/categories/Career Guidance.png",
      name: "Career Guidance",
    },
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
          {shuffleArray(societies)
            .slice(0, 5)
            .map((society, index) => (
              <Link key={index} to={`/societies/${society._id}`} className="society">
                <img src={society.picture} alt={society.name} className="society-img" />
                <h3>{society.name}</h3>
              </Link>
            ))}
        </div>
      </section>

      {/* FYP Section */}
      <section className="fyp">
        <h2>Final Year Projects</h2>
        <div className="fyp-container">
          {randomFyps.length > 0 ? (
            randomFyps.map((fyp) => (
              <Link key={fyp._id} to={`/project/${fyp._id}`} className="fyp-item">
                <img src={fyp.picture} alt={fyp.name} className="fyp-img" />
                <h3>{fyp.name}</h3>
              </Link>
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
    </div>
  );
};

export default Home;
