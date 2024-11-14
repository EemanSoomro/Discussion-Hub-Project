import React from 'react';
import './Home.css'; // For styling (optional)

const Home = () => {
    // Sample data for societies, FYPs, and discussion forums
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
        { image: "/images/fyps/Android Based Sceurity and Emergency Alert system using CCTV cameras.png", name: "Android Based Sceurity and Emergency Alert system using CCTV cameras" },
        { image: "/images/fyps/Music Recommender System Android Application.png", name: "Music Recommender System Android Application" },
        { image: "/images/fyps/Layout Code Generator by using AI techniques.png", name: "Layout Code Generator by using AI techniques" }
    ];
    const discussionCategories = ["Category 1", "Category 2", "Category 3", "Category 4"];

    return (
        <div className="home-container">
            <nav className="navbar">
                <h2>General Hub</h2>
                <ul>
                    <li>Home</li>
                    <li>Societies</li>
                    <li>FYP</li>
                    <li>Discussion Forum</li>
                    <li>Announcements</li>
                </ul>
            </nav>
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
                <ul>
                    {discussionCategories.map((category, index) => (
                        <li key={index}>{category}</li>
                    ))}
                </ul>
            </section>
            <section className="announcements">
                <h2>Announcements</h2>
                <p>Stay updated with the latest news and events!</p>
                {/* Add more announcements here */}
            </section>
        </div>
    );
};

export default Home;
