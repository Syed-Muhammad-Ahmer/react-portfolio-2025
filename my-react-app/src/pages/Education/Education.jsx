import { useState, useEffect } from 'react';
import { useContext } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import CustomTable from '../../components/CustomTable/CustomTable';
import styles from './Education.module.css';

const Education = () => {
  const { setTitle } = usePageTitle();
  const [educationData, setEducationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  setTitle('Education');

  useEffect(() => {
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

    fetchEducationData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={styles.education}>
      <h1>My Education</h1>
      <div className={styles.tableWrapper}>
        <CustomTable data={educationData} />
      </div>
    </div>
  );
};

export default Education;