import React from 'react';

import styles from './QuoteItem.module.css';

const QuoteItem = (props) => {
  return (
    <li id={props.id} className={styles['quote-item']}>
      <p>{props.text}</p>
      <span>- {props.author}</span>
    </li>
  )
}

export default QuoteItem