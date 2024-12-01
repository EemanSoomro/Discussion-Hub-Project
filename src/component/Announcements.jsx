import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Announcements.css';  // Import the CSS file

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([]);

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

  return (
    <div className="announcements-container">
      <h1 className="announcements-title">Latest Announcements</h1>
      {announcements.length > 0 ? (
        announcements.map((announcement) => (
          <div key={announcement._id} className="announcement-card">
            <h2 className="announcement-subject">{announcement.subject}</h2>
            <p className="announcement-type"><strong>Type:</strong> {announcement.type}</p>
            <p className="announcement-body">{announcement.body}</p>
            <p className="announcement-date"><small><strong>Date:</strong> {announcement.date}</small></p>
          </div>
        ))
      ) : (
        <p>No announcements available.</p>
      )}
    </div>
  );
};

export default Announcements;
