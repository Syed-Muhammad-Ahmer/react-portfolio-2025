import React from 'react';
import styles from './Projects.module.css';
// import styles from '../assets/images/'

const Projects = () => {
  return (
    <section className={styles.highlights}>
      <h3 className={styles.sectionTitle}>Projects</h3>
     
      <div className={styles.projectCards}>
        <div className={styles.projectCard}>
          <a href="https://yourgame.itch.io" target="_blank" rel="noopener noreferrer">
            <img src="assets/Game dev.jpg" alt="2D Platformer Game" className={styles.projectImage} />
          </a>
          <h4>Game Development</h4>
          <p>
          Developed a 2D platformer game using C# and Unity, focusing on smooth character movement, collision detection, and interactive game mechanics. Designed multiple levels with engaging gameplay elements and implemented physics-based interactions. 
          Successfully published the game on Itch.io for public access and feedback.
          </p>
        </div>
            
                  
        <div className={`${styles.projectCard} ${styles.chessImage}`}>
          <img src="assets/chess.jpeg" alt="Chess in C++" className={styles.projectImage} />
          <h4>Chess in C++</h4>
          <p>
          Designed and developed a console-based chess game from scratch using C++. Implemented game mechanics such as piece movement validation, check/checkmate detection etc. Added undo/redo functionality to allow players to revisit 
          previous moves and incorporated mouse support to enhance user experience.          </p>
        </div>

        <div className={styles.projectCard}>
          <img src="assets/web dev.jpg" alt="Web Development Projects" className={styles.projectImage} />
          <h4>Web Development</h4>
          <p>
          Gained hands-on experience with HTML and CSS by working on small-scale projects, including personal web pages and responsive layouts. Focused on designing structured, visually appealing, and mobile-friendly
           web pages while improving knowledge of fundamental web development concepts.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Projects;
