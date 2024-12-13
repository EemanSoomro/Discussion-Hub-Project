import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectDetails.css"; // Import custom styles

const ProjectDetails = () => {
  const { id } = useParams(); // Get project ID from the URL
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await axios.get(`http://localhost:8800/api/projects/find/${id}`);
        if (res.data) {
          setProject(res.data);
        } else {
          setError("Project data not found.");
        }
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch project details.");
        setLoading(false);
      }
    };
    fetchProject();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Ensure all necessary fields are available
  if (!project || !project.name) {
    return <div>Project details are not available at the moment.</div>;
  }

  return (
    <div className="project-details">
      <div className="header">
        <img src={project.picture || '/fallback-image.png'} alt={project.name} className="header-image" />
        <div className="header-info">
          <h1>{project.name}</h1>
          {project.type && <p className="header-type">Type: {project.type}</p>}
          {project.supervisor && <p className="header-supervisor">Supervisor: {project.supervisor}</p>}
        </div>
      </div>

      <section className="about-section">
        <h2>Objective</h2>
        <p>{project.objective}</p>
      </section>

      <section className="application-section">
        <h2>Application</h2>
        <p>{project.application}</p>
      </section>

      <section className="technologies-section">
        <h2>Technologies Used</h2>
        <p>{project.technologies}</p>
      </section>

      <section className="abstract-section">
        <h2>Abstract</h2>
        <p>{project.abstract}</p>
      </section>

      <section className="domain-section">
        <h2>Domain</h2>
        <p>{project.domain}</p>
      </section>

      <section className="status-section">
        <h2>Status</h2>
        <p>{project.status}</p>
      </section>

      <section className="year-section">
        <h2>Year</h2>
        <p>{project.year}</p>
      </section>

      <section className="university-section">
        <h2>University</h2>
        <p>{project.university}</p>
      </section>
    </div>
  );
};

export default ProjectDetails;
