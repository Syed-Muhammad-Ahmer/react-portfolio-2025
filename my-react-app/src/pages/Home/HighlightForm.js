import { useState } from 'react';
import styles from './Home.module.css';

const HighlightForm = ({ 
  formData, 
  handleInputChange, 
  handleSubmit, 
  onCancel, 
  isEditing 
}) => {
  return (
    <div className={styles.formModal}>
      <div className={styles.formContainer}>
        <h3>{isEditing ? 'Edit Highlight' : 'Add New Highlight'}</h3>
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
              rows="4"
            />
          </div>
          
          <div className={styles.formActions}>
            <button type="submit" className={styles.submitButton}>
              {isEditing ? 'Update' : 'Add'}
            </button>
            <button 
              type="button" 
              onClick={onCancel} 
              className={styles.cancelButton}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HighlightForm;