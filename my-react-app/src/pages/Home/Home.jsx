
import { useState, useEffect } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import styles from './Home.module.css';

const Home = () => {
  const { setTitle } = usePageTitle();
  const [highlights, setHighlights] = useState([]);
  const [loading, setLoading] = useState(true);

  setTitle('Home');

  useEffect(() => {
    const fetchHighlights = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/v1/highlights');
        const data = await response.json();
        setHighlights(data.data || []);
      } catch (err) {
        console.error('Failed to fetch highlights:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHighlights();
  }, []);

  if (loading) return <div>Loading highlights...</div>;

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
        
        <section className={styles.highlights}>
          {highlights.map((highlight) => (
            <div key={highlight._id} className={styles.highlightCard}>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
            </div>
          ))}
        </section>
      </div>

      <div className={styles.sidebar}>
        <ProfileSidebar />
      </div>
    </div>
  );
};

export default Home;