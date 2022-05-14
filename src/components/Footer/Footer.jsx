import React from 'react';
import { Link } from 'react-router-dom';
import footerImage from '../../assets/footer.svg';

import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles['footer-wrapper']}>
        <Link to="/">KossQuotes</Link>
        <img src={footerImage} alt="Till the next time!" />
        <ul>
          <li><Link to="/new-quote">New Quote</Link></li>
        </ul>
      </div>
      <div className={styles.copyright}>&copy;KossQuotes 2022. All rights reserved</div>
    </footer>
  )
}

export default Footer