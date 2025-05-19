
import { useState, useEffect } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import CustomTable from '../../components/CustomTable/CustomTable';
import styles from './Education.module.css';
import EducationForm from './EducationForm';

const Education = () => {
  const { setTitle } = usePageTitle();
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    degree: '',
    institution: '',
    year: '',
    grade: ''
  });

  setTitle('Education');

  useEffect(() => {
    fetchEducationData();
  }, []);

  const fetchEducationData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/education');
      if (!response.ok) {
        throw new Error('Failed to fetch education data');
      }
      const data = await response.json();
      setEducationData(data.data);
    } catch (err) {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;
      if (editingId) {
        // Update existing record
        response = await fetch(`http://localhost:5000/api/v1/education/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      } else {
        // Create new record
        response = await fetch('http://localhost:5000/api/v1/education', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
      }

      if (!response.ok) {
        throw new Error('Failed to save education data');
      }

      fetchEducationData(); // Refresh the data
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (item) => {
    setEditingId(item._id);
    setFormData({
      degree: item.degree,
      institution: item.institution,
      year: item.year,
      grade: item.grade
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/v1/education/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete education record');
      }

      fetchEducationData(); // Refresh the data
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      degree: '',
      institution: '',
      year: '',
      grade: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.education}>
      <h1>My Education</h1>
      
      <button 
        onClick={() => setShowForm(true)} 
        className={styles.addButton}
      >
        Add New Education
      </button>

      {showForm && (
        <EducationForm 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingId}
        />
      )}

      <div className={styles.tableWrapper}>
        <CustomTable 
          data={educationData} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default Education;