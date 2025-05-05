import styles from './ProfileSidebar.module.css';

const ProfileSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.profileImageContainer}>
        <div className={styles.profileImage}></div>
      </div>
      <h2 className={styles.name}>Syed Muhammad Ahmer</h2>
      <p>Web Developer</p>
      <div className={styles.details}>
        <p><strong>Email:</strong> syedmuhammadahmernaqvi@gmail.com</p>
        <p><strong>Location:</strong> Lahore, Pakistan</p>
        <p><strong>Skills:</strong> React, JavaScript, CSS,Boostrap</p>
      </div>
    </aside>
  );
};

export default ProfileSidebar;
