import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>&copy; {new Date().getFullYear()} Syed Muhammad Ahmer's Portfolio. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
