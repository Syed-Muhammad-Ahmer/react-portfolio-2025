import PropTypes from 'prop-types';
import styles from './Card.module.css';

const Card = ({ 
  title = '', 
  description = '', 
  technologies = [], 
  image, 
  link 
}) => {
  return (
    <div className={styles.card}>
      {image && (
        <div className={styles.imageContainer}>
          <img src={image} alt={title} className={styles.cardImage} />
        </div>
      )}
      <div className={styles.cardContent}>
        {title && <h3>{title}</h3>}
        {description && <p>{description}</p>}
        {technologies && technologies.length > 0 && (
          <div className={styles.technologies}>
            {technologies.map((tech, index) => (
              <span key={index}>{tech}</span>
            ))}
          </div>
        )}
      </div>
      {link && (
        <div className={styles.cardFooter}>
          <a href={link} target="_blank" rel="noopener noreferrer">
            View Project
          </a>
        </div>
      )}
    </div>
  );
};
Card.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
    technologies: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string,
    link: PropTypes.string
  };
  
  Card.defaultProps = {
    title: '',
    description: '',
    technologies: [],
    image: '',
    link: ''
  };
export default Card;
