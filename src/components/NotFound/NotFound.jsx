import React from 'react';
import notFoundImage from '../../assets/error.svg';
import { useNavigate } from 'react-router-dom';

import styles from './NotFound.module.css';

const NotFound = () => {

    const navigate = useNavigate();

  return (
    <section className={styles['not-found']}>
        <img src={notFoundImage} alt="Not found image" />
        <button onClick={() => navigate(-1)}>Go back</button>
    </section>
  )
}

export default NotFound