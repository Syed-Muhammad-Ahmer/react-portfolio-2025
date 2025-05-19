import React from 'react';
import styles from './Projects.module.css';

const ProjectForm = ({ 
  formData, 
  handleInputChange, 
  handleTechInputChange,
  addTechnology,
  removeTechnology,
  handleSubmit, 
  onCancel, 
  isEditing 
}) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTechnology();
    }
  };

  return (
    <div className={styles.projectForm}>
      <h4>{isEditing ? 'Edit Project' : 'Add New Project'}</h4>
      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows="3"
          />
        </div>

        <div className={styles.formGroup}>
          <label>Image URL</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Project URL (optional)</label>
          <input
            type="url"
            name="projectUrl"
            value={formData.projectUrl}
            onChange={handleInputChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Technologies</label>
          <div className={styles.techInputContainer}>
            <input
              type="text"
              value={formData.currentTechInput}
              onChange={handleTechInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Add technology and press Enter"
            />
            <button 
              type="button" 
              onClick={addTechnology}
              className={styles.addTechButton}
            >
              Add
            </button>
          </div>
          <div className={styles.techTags}>
            {formData.technologies.map((tech) => (
              <span key={tech} className={styles.techTag}>
                {tech}
                <button 
                  type="button" 
                  onClick={() => removeTechnology(tech)}
                  className={styles.removeTechButton}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="submit" className={styles.submitButton}>
            {isEditing ? 'Update Project' : 'Add Project'}
          </button>
          <button type="button" onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;