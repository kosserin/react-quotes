import React, {useEffect, useContext} from 'react';
import { QuotesContext } from '../../../store/quotes-context';
import QuoteItem from './QuoteItem/QuoteItem';
import { Link } from 'react-router-dom';

import styles from './QuoteList.module.css';

const QuoteList = () => {

    const ctx = useContext(QuotesContext);

    let content = ctx.quotes.map(quote => {
      return <QuoteItem key={quote.id} id={quote.id} text={quote.text} author={quote.author} objectKey={quote.objectKey} />
  })
  
  if(ctx.quotes.length === 0) {
    content = <p>Seems like there are no quotes. You can <Link to="/new-quote">create one</Link>.</p>
  }
  
  if(ctx.isLoading) {
    content = <p>Loading...</p>
  }

  if(ctx.error) {
    content = <p>{ctx.error}</p>
  }

  return (
    <ul className={styles['quote-list']}>
        {content}
    </ul>
  )
}

export default QuoteList