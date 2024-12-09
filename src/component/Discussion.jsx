// Discussion.jsx
import React from 'react';
import './Discussion.css';

const categories = [
  { image: "/images/categories/Academic Discussions.png", name: "Academic Discussions" },
  { image: "/images/categories/Extracurricular Activities.png", name: "Extracurricular Activities" },
  { image: "/images/categories/University announcement and uppdates.png", name: "Announcement and Updates" },
  { image: "/images/categories/Career Guidance.png", name: "Career Guidance" },
  { image: "/images/categories/Campus Life.png", name: "Campus Life" },
];

const Discussion = () => {
  return (
    <div className="discussion-page">
      <h1>Discussion Forum</h1>
      
      <div className="categories">
        {categories.map((category, index) => (
          <div key={index} className="category-card">
            <img src={category.image} alt={category.name} className="category-image" />
            <h2>{category.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Discussion;
