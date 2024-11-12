import React from 'react';
import './Home.css'; // For styling (optional)

const Home = () => {
    // Sample data for societies, FYPs, and discussion forums
    const societies = [
        { name: "Society 1", image: "/images/societies/art.png" },
        { name: "Society 2", image: "/images/societies/music.png" },
        { name: "Society 3", image: "/images/societies/IEEE.png" },
        { name: "Society 4", image: "/images/societies/Sport.png" },
        { name: "Society 5", image: "/images/societies/Welfare.png" }
    ];
    const fyps = ["FYP 1", "FYP 2", "FYP 3", "FYP 4", "FYP 5"];
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
                <h2>FYP Submissions</h2>
                <ul>
                    {fyps.map((fyp, index) => (
                        <li key={index}>{fyp}</li>
                    ))}
                </ul>
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
