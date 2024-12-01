import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Societies.css";

// Define the getSocieties function outside the component
async function getSocieties(setSocieties) {
  try {
    const res = await axios.get("http://localhost:8800/api/societies"); // Hardcoded endpoint
    setSocieties(res.data); // Set the societies data after fetching
  } catch (err) {
    console.log("Error fetching societies:", err);
  }
}

const Societies = () => {
  const [societies, setSocieties] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const societiesPerPage = 12;

  // Fetch societies data when the component mounts
  useEffect(() => {
    getSocieties(setSocieties);
  }, []);

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
      <section
        className="hero-banner"
        style={{ backgroundImage: `url('/images/Banner.webp')` }}
      >
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
            <div key={society.id} className="society-card">
              <div className="image-container">
                <img src={society.picture} alt={society.name} />
                <div className="overlay">
                  {/* <p>{society.description}</p> */}
                </div>
                <div className="name-overlay">
                  <h3>{society.name}</h3>
                </div>
              </div>
            </div>
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
