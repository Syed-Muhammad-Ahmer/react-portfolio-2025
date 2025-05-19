
import React, { useState, useEffect } from 'react';
import styles from './Projects.module.css';
import ProjectForm from './ProjectForm'; // We'll create this component

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: [],
    imageUrl: '',
    projectUrl: '',
    currentTechInput: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/projects', {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.text();
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTechInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      currentTechInput: e.target.value
    }));
  };

  const addTechnology = () => {
    if (formData.currentTechInput.trim() && !formData.technologies.includes(formData.currentTechInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...prev.technologies, prev.currentTechInput.trim()],
        currentTechInput: ''
      }));
    }
  };

  const removeTechnology = (techToRemove) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies.filter(tech => tech !== techToRemove)
    }));
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      title: formData.title,
      description: formData.description,
      technologies: formData.technologies,
      imageUrl: formData.imageUrl,
      projectUrl: formData.projectUrl || ''
    };

    let response;
    if (editingId) {
      response = await fetch(`http://localhost:5000/api/v1/projects/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    } else {
      response = await fetch('http://localhost:5000/api/v1/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
    }

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(result.message || 'Failed to save project');
    }

    fetchProjects();
    resetForm();
  } catch (err) {
    setError(err.message);
  }
};
  const handleEdit = (project) => {
    setEditingId(project._id);
    setFormData({
      title: project.title,
      description: project.description,
      technologies: project.technologies,
      imageUrl: project.imageUrl,
      projectUrl: project.projectUrl,
      currentTechInput: ''
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
  if (!id) {
    setError('No project ID provided for deletion');
    return;
  }
 if (!window.confirm('Are you sure you want to delete this project?')) {
    return;
  }
  try {
    const response = await fetch(`http://localhost:5000/api/v1/projects/${id}`, {
      method: 'DELETE',
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || 'Failed to delete project');
    }

    fetchProjects();
  } catch (err) {
    setError(err.message);
  }
};
  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      technologies: [],
      imageUrl: '',
      projectUrl: '',
      currentTechInput: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className={styles.highlights}>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>Projects</h3>
        <button 
          onClick={() => setShowForm(true)} 
          className={styles.addButton}
        >
          + Add New Project
        </button>
      </div>

      {showForm && (
        <ProjectForm 
          formData={formData}
          handleInputChange={handleInputChange}
          handleTechInputChange={handleTechInputChange}
          addTechnology={addTechnology}
          removeTechnology={removeTechnology}
          handleSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingId}
        />
      )}

      <div className={styles.projectCards}>
        {projects.map((project) => (
          <div className={styles.projectCard} key={project._id}>
            <div className={styles.projectActions}>
              <button 
                onClick={() => handleEdit(project)}
                className={styles.editButton}
                aria-label="Edit"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                </svg>
              </button>
              <button 
                onClick={() => handleDelete(project._id)}
                className={styles.deleteButton}
                aria-label="Delete"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M3 6h18" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                </svg>
              </button>
            </div>
            
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