import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Announcements.css';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [filteredAnnouncements, setFilteredAnnouncements] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    { name: "General Announcements", image: "/images/Announcement categories/general.png" },
    { name: "Academic Announcements", image: "/images/Announcement categories/academic.png" },
    { name: "Admissions", image: "/images/Announcement categories/admissions.png" },
    { name: "Events and Seminars", image: "/images/Announcement categories/events.png" },
    { name: "Scholarships and Financial Aid", image: "/images/Announcement categories/scholarships.png" },
    { name: "Job Opportunities", image: "/images/Announcement categories/jobs.png" },
    { name: "Student Societies & Clubs Updates", image: "/images/Announcement categories/societies.png" },
    { name: "Important Deadlines", image: "/images/Announcement categories/deadlines.png" },
  ];

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/announcements");
        setAnnouncements(res.data);
      } catch (err) {
        console.error("Error fetching announcements:", err);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    const filtered = announcements.filter(
      (announcement) => announcement.type === category
    );
    setFilteredAnnouncements(filtered);
  };

  const closePopup = () => {
    setSelectedCategory(null);
    setFilteredAnnouncements([]);
  };

  return (
    <div className="ann-announcements-container">
      <h1 className="ann-announcements-title">Announcements</h1>
      
      {/* Categories Section */}
      <div className="ann-categories-container">
        {categories.map((category) => (
          <div
            key={category.name}
            className="ann-category-card"
            onClick={() => handleCategoryClick(category.name)}
          >
            <img
              src={category.image}
              alt={category.name}
              className="ann-category-image"
            />
            <h3>{category.name}</h3> {/* Category name at the bottom */}
          </div>
        ))}
      </div>

      {/* Pop-up Section */}
      {selectedCategory && (
        <div className="ann-popup-overlay">
          <div className="ann-popup">
            <h2>{selectedCategory}</h2>
            <button className="ann-close-button" onClick={closePopup}>Close</button>
            <div className="ann-popup-content">
              {filteredAnnouncements.length > 0 ? (
                <table>
                  <thead>
                    <tr>
                      <th>Subject</th>
                      <th>Body</th>
                      <th className="date-column">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredAnnouncements.map((announcement) => (
                      <tr key={announcement._id}>
                        <td>{announcement.subject}</td>
                        <td>{announcement.body}</td>
                        <td>{announcement.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="ann-empty-state">
                  <h3>No Announcements Available</h3>
                  <p>There are no announcements for this category yet.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Announcements;
