import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./SocietyDetails.css"; // Import custom styles

const SocietyDetails = () => {
  const { id } = useParams(); // Get society ID from the URL
  const [society, setSociety] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSociety = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/societies/find/${id}`);
        setSociety(res.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch society details.");
        setLoading(false);
      }
    };
    fetchSociety();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="society-details">
      <div className="header">
        <img src={society.picture} alt={society.name} className="header-image" />
        <div className="header-info">
          <h1>{society.name}</h1>
          {society.tagline && <p className="header-tagline">{society.tagline}</p>}
        </div>
      </div>

      <section className="about-section">
        <h2>About {society.name}</h2>
        <p>{society.description}</p>
      </section>

      {/* Check if events exist and display them */}
      <section className="events-section">
        <h2>Upcoming Events</h2>
        {society.events && society.events.length > 0 ? (
          <ul>
            {society.events.map((event, index) => (
              <li key={index}>
                <h3>{event.name}</h3>
                <p>{event.details}</p>
                <p>{event.date}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No upcoming events for this society.</p>
        )}
      </section>

      {/* Check if roles exist and display them */}
      <section className="roles-section">
        <h2>Team Roles</h2>
        {society.roles && society.roles.length > 0 ? (
          <ul>
            {society.roles.map((role, index) => (
              <li key={index}>{role}</li>
            ))}
          </ul>
        ) : (
          <p>No roles defined for this society.</p>
        )}
      </section>

      
    </div>
  );
}

export default SocietyDetails;
