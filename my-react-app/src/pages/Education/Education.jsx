import { useContext } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import CustomTable from '../../components/CustomTable/CustomTable';
import styles from './Education.module.css';

const Education = () => {
  const { setTitle } = usePageTitle();
  setTitle('Education');

  const educationData = [
    {
      degree: 'FSC',
      institution: 'Government College University, Lahore',
      year: '2021-2023',
      grade: '90%'
    },
    {
      degree: 'Bachelors  in Computer Science',
      institution: 'Information Technology University, Lahore',
      year: '2023-2027',
      grade: 'CGPA: 3.4'
    },
    {
      degree: 'Web Development Bootcamp',
      institution: 'Code Academy',
      year: '2024',
      grade: 'Certificate with Distinction'
    }
  ];

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
