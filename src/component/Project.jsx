import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Project.css';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ year: "", department: "", status: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8800/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1>Final Year Projects (FYPs)</h1>
        <p>Showcasing innovative ideas and solutions by students.</p>
      </header>

      {/* Search & Filters */}
      <div className="search-filters">
        <input
          type="text"
          placeholder="Search by title, keyword, or student name..."
          value={search}
          onChange={handleSearch}
        />
        <select name="year" onChange={handleFilterChange}>
          <option value="">Year</option>
          <option value="2023">2023</option>
          <option value="2024">2024</option>
        </select>
        <select name="department" onChange={handleFilterChange}>
          <option value="">Department</option>
          <option value="CS">CS</option>
          <option value="SE">SE</option>
        </select>
        <select name="status" onChange={handleFilterChange}>
          <option value="">Status</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      {/* Project Cards */}
      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <div className="project-card" key={project._id}>
            <h3>{project.name}</h3>
            <p><b>Supervisor:</b> {project.supervisor}</p>
            <p>{project.objective.slice(0, 50)}...</p>
            <p><b>Status:</b> {project.status || "N/A"}</p>
            <button onClick={() => navigate(`/projects/${project._id}`)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Contact us for project-related queries.</p>
        <a href="/guidelines">Project Guidelines</a>
      </footer>
    </div>
  );
};

export default Projects;
