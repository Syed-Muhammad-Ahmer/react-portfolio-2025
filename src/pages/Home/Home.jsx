import { useContext } from 'react';
import { usePageTitle } from '../../context/PageTitleContext';
import ProfileSidebar from '../../components/ProfileSidebar/ProfileSidebar';
import styles from './Home.module.css';


const Home = () => {
  const { setTitle } = usePageTitle();
  setTitle('Home');

  return (
    <div className={styles.home}>
      <div className={styles.mainContent}>
        <section>
        <div className={styles.profileImageContainer}>
                                <div className={styles.profileImage}></div>
                              </div>
                            <div className={styles.mobiletext}>
        <p >Syed Muhammad Ahmer</p>
        
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
          <div className={styles.highlightCard}>
            <h3>Projects</h3>
            <p>
            I have worked on various projects in Game Development, Web Development, as well as C++ and Python projects.
            </p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Skills</h3>
            <p>
              React, Node.js, JavaScript, CSS, Bootstrap,  and modern development 
              tools and practices.
            </p>
          </div>
          <div className={styles.highlightCard}>
            <h3>Experience</h3>
            <p>
              2+ years of professional experience building scalable web
              applications for various clients.
            </p>
            
          </div>
          <div className={styles.highlightCard}>
            <h3>Tools & Languages</h3>
            <p>
            I have worked with C++, C#, Python, HTML, CSS, JavaScript, Unity, Firebase, React, and other modern development tools.

            </p>
            
          </div>
        </section>
      </div>

      <div className={styles.sidebar}>
        <ProfileSidebar />
      </div>
    </div>
  );
};

export default Home;
