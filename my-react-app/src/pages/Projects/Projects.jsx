import React, { useState, useEffect } from 'react';
import styles from './Projects.module.css';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

 useEffect(() => {
  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/projects', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.text(); // Read response as text first
        console.error('API Error:', errorData);
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data.data);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.highlights}>
      <h3 className={styles.sectionTitle}>Projects</h3>
     
      <div className={styles.projectCards}>
        {projects.map((project) => (
          <div className={styles.projectCard} key={project._id}>
            {project.projectUrl ? (
              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer">
                <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
              </a>
            ) : (
              <img src={project.imageUrl} alt={project.title} className={styles.projectImage} />
            )}
            <h4>{project.title}</h4>
            <p>{project.description}</p>
            <div className={styles.technologies}>
              {project.technologies.map((tech) => (
                <span key={tech}>{tech}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;