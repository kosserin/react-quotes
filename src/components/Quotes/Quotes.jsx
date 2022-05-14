import React from 'react'
import QuoteList from './QuoteList/QuoteList';

import styles from './Quotes.module.css';

const Quotes = () => {
  return (
    <section className={styles.quotes}>
      <h1>Discover some of the best quotes on the internet.</h1>
      <h3>Share it with your friends</h3>
      <QuoteList />
    </section>
  )
}

export default Quotes