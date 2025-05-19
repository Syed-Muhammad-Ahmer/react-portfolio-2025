
import { useState, useEffect } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import HighlightForm from './HighlightForm';
import styles from './Home.module.css';

const Home = () => {
  const { setTitle } = usePageTitle();
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: ''
  });

  setTitle('Home');

  useEffect(() => {
    fetchHighlights();
  }, []);

  const fetchHighlights = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/v1/highlights');
      if (!response.ok) {
        throw new Error('Failed to fetch highlights');
      }
      const data = await response.json();
      setHighlights(data.data || []);
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
      const payload = {
        title: formData.title,
        description: formData.description
      };

      if (editingId) {
        response = await fetch(`http://localhost:5000/api/v1/highlights/${editingId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      } else {
        response = await fetch('http://localhost:5000/api/v1/highlights', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save highlight');
      }

      fetchHighlights();
      resetForm();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleEdit = (highlight) => {
    setEditingId(highlight._id);
    setFormData({
      title: highlight.title,
      description: highlight.description
    });
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this highlight?')) {
      return;
    }
    
    try {
      const response = await fetch(`http://localhost:5000/api/v1/highlights/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete highlight');
      }

      fetchHighlights();
    } catch (err) {
      setError(err.message);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: ''
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error}</div>;

  return (
    <div className={styles.home}>
      <div className={styles.mainContent}>
        <section>
          <div className={styles.profileImageContainer}>
            <div className={styles.profileImage}></div>
          </div>
          <div className={styles.mobiletext}>
            <p>Syed Muhammad Ahmer</p>
          </div>  
        </section>
        
        <section className={styles.welcomeSection}>
          <h1>Welcome to My Portfolio</h1>
          <p>
            I'm a passionate developer with expertise in modern web technologies.
            Explore my projects, education, and feel free to get in touch!
          </p>
        </section>
        <section>
          <button 
            onClick={() => setShowForm(true)}
            className={styles.addButton}
            >
            + Add Highlight
          </button>
            
                    </section>
        
        <section className={styles.highlights}>
          {highlights.map((highlight) => (
            <div key={highlight._id} className={styles.highlightCard}>
              <div className={styles.cardActions}>
                <button 
                  onClick={() => handleEdit(highlight)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(highlight._id)}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </div>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          ))}
        </section>
      </div>

      <div className={styles.sidebar}>
        <ProfileSidebar />
      </div>

      {showForm && (
        <HighlightForm 
          formData={formData}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={!!editingId}
        />
      )}
    </div>
  );
};

export default Home;