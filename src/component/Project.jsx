import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Project.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ year: "", department: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1); // Current page for pagination
  const [projectsPerPage] = useState(16); // Number of projects per page
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

  // Filter projects based on search and selected filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name.toLowerCase().includes(search.toLowerCase());
    const matchesYear = filters.year ? project.year === filters.year : true;
    const matchesDepartment = filters.department ? project.department === filters.department : true;
    const matchesStatus = filters.status ? project.status === filters.status : true;

    return matchesSearch && matchesYear && matchesDepartment && matchesStatus;
  });

  // Get the index of the first and last project on the current page
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;

  // Slice the filtered projects to only show the ones for the current page
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);

  // Calculate total pages
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  // Change the page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="hero-banner">
        <div className="image" style={{ backgroundImage: `url(/images/FypPageBanner.png)` }}></div>
        <div className="hero-text">
          <h1>Final Year Projects (FYPs)</h1>
          <p>Showcasing innovative ideas and solutions by students.</p>
        </div>
        <div className="overlay"></div>
      </div>

      {/* Search & Filters */}
      <div className="search-filters">
        <div className="row">
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
        </div>
        <div className="row">
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
      </div>

      {/* Project Cards */}
      <div className="projects-grid">
        {currentProjects.map((project) => (
          <div className="project-card" key={project._id}>
            <div className="image-container">
              <img 
                src={project.picture ? project.picture : '/fallback-image.png'} 
                alt={project.name} 
              />
            </div>
            <div className="name-overlay">
              <h3>{project.name}</h3>
            </div>
          </div>
        ))}
      </div>

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

      {/* Footer */}
      <footer className="footer">
        <p>Contact us for project-related queries.</p>
        <a href="/guidelines">Project Guidelines</a>
      </footer>
    </div>
  );
};

export default Projects;
