import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './ProjectDetails.css';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8800/api/projects/find/${id}`)
      .then((res) => res.json())
      .then((data) => setProject(data))
      .catch((err) => console.error("Error fetching project:", err));
  }, [id]);

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      {/* Header */}
      <header className="header">
        <h1>{project.name}</h1>
        <p><b>Supervisor:</b> {project.supervisor}</p>
      </header>

      {/* Details */}
      <div className="project-details">
        <p><b>Description:</b> {project.abstract}</p>
        <p><b>Objectives:</b> {project.objective}</p>
        <p><b>Technologies:</b> {project.technologies}</p>
        <p><b>Team Members:</b> {project.team || "N/A"}</p>
        <p><b>Domain:</b> {project.domain || "N/A"}</p>
      </div>

      {/* Footer */}
      <footer className="footer">
        <p>Need more info? Contact us!</p>
      </footer>
    </div>
  );
};

export default ProjectDetails;
