import React from 'react';
import { Link } from 'react-router-dom';

import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/">KossQuotes</Link>
      <ul>
        <li><Link to="/new-quote">New Quote</Link></li>
      </ul>
    </header>
  )
}

export default Header