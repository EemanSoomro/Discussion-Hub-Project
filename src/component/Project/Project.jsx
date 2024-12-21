import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Project.css";

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({ year: "", department: "", status: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 16; // Projects per page
  const navigate = useNavigate();

  // Fetch projects from API
  useEffect(() => {
    fetch("http://localhost:8800/api/projects")
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error("Error fetching projects:", err));
  }, []);

  // Handle input changes for search and filters
  const handleSearch = (e) => setSearch(e.target.value.trim());
  const handleFilterChange = (e) =>
    setFilters((prevFilters) => ({ ...prevFilters, [e.target.name]: e.target.value }));

  // Filter projects based on search and filters
  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.name?.toLowerCase().includes(search.toLowerCase()) || false;
    const matchesYear = filters.year ? project.year === parseInt(filters.year, 10) : true;
    const matchesDepartment = filters.department
      ? project.domain?.toLowerCase() === filters.department.toLowerCase()
      : true;
    const matchesStatus = filters.status
      ? project.status?.toLowerCase() === filters.status.toLowerCase()
      : true;

    return matchesSearch && matchesYear && matchesDepartment && matchesStatus;
  });

  // Pagination logic
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Navigate to project details
  const handleProjectClick = (id) => {
    navigate(`/project/${id}`); // Navigate to the specific project details page
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

      {/* Search and Filters */}
      <div className="search-filters">
        <div className="row-full-width">
          <input
            type="text"
            placeholder="Quick Search.."
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="row">
          <select name="year" value={filters.year} onChange={handleFilterChange}>
            <option value="">Year</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            <option value="2020">2020</option>
          </select>
          <select name="department" value={filters.department} onChange={handleFilterChange}>
            <option value="">Department</option>
            <option value="CS">CS</option>
            <option value="EE">EE</option>
            <option value="SE">SE</option>
          </select>
          <select name="status" value={filters.status} onChange={handleFilterChange}>
            <option value="">Status</option>
            <option value="Completed">Completed</option>
            <option value="In Progress">In Progress</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {currentProjects.map((project) => (
         <div className="project-card" key={project._id} onClick={() => handleProjectClick(project._id)}>
         <img src={project.picture} alt={project.name} className="project-img" />
         <h3>{project.name}</h3>
         <div className="hover-details">
           <p>Year: {project.year}</p>
           <p>Department: {project.domain}</p>
           <p>Status: {project.status}</p>
         </div>
       </div>
       

          
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`page-number ${currentPage === index + 1 ? "active" : ""}`}
            onClick={() => paginate(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Projects;
