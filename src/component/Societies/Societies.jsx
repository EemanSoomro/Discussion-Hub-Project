import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import axios from "axios";
import "./Societies.css";

// Shuffle function to randomize the array
function shuffleArray(arr) {
  const shuffled = [...arr]; // Create a copy of the original array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }
  return shuffled;
}

async function getSocieties(setSocieties) {
  try {
    const res = await axios.get("http://localhost:8800/api/societies");
    setSocieties(res.data);
  } catch (err) {
    console.log("Error fetching societies:", err);
  }
}

const Societies = () => {
  const [societies, setSocieties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const societiesPerPage = 16;

  useEffect(() => {
    getSocieties((data) => {
      const shuffledData = shuffleArray(data); // Shuffle societies after fetching
      setSocieties(shuffledData);
    });
  }, []);

  // Reset current page to 1 whenever the search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Filter societies based on the search term
  const filteredSocieties = societies.filter((society) =>
    society.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Paginate the societies
  const indexOfLastSociety = currentPage * societiesPerPage;
  const indexOfFirstSociety = indexOfLastSociety - societiesPerPage;
  const currentSocieties = filteredSocieties.slice(
    indexOfFirstSociety,
    indexOfLastSociety
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total pages for pagination
  const totalPages = Math.ceil(filteredSocieties.length / societiesPerPage);

  return (
    <div className="societies-page">
      {/* Banner Section */}
      <section className="hero-banner">
        <div className="image" style={{ backgroundImage: `url('/images/Banner.webp')` }}></div>
        <div className="overlay"></div>
        <div className="hero-text">
          <h1>Explore Our Societies and Clubs</h1>
          <p>Join a community that shares your interests and passions.</p>
        </div>
      </section>

      {/* Search Bar Section */}
      <section className="search-section">
        <input
          type="text"
          placeholder="Quick search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </section>

      {/* Societies Grid Section */}
      <section className="societies-grid">
        <div className="societies-container">
          {currentSocieties.map((society) => (
            <Link
              key={society.id}
              to={`/societies/${society._id}`} // Navigate to society details page
              className="society-card"
            >
              <div className="image-container">
                <img src={society.picture} alt={society.name} />
                <div className="overlay"></div>
                <div className="name-overlay">
                  <h3>{society.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Pagination Section */}
      <section className="pagination-section">
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Societies;
