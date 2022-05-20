import React, {useState, useContext} from 'react';
import { QuotesContext } from '../../../../store/quotes-context';

import styles from './QuoteItem.module.css';

const QuoteItem = (props) => {

  const ctx = useContext(QuotesContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const removeData = async (key) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(`https://react-quotes-994eb-default-rtdb.europe-west1.firebasedatabase.app/quotes/${key}.json`, {
          method: "DELETE",
      });
      if(!response.ok) {
          throw new Error;
      }
      const data = await response.json();
      console.log(data);
      ctx.removeQuote(props.id);
      } catch (err) {
          setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
  }

  const removeQuoteHandler = () => {
    removeData(props.objectKey);
  }

  let removeBtnContent = "Remove";

  if(isLoading) {
    removeBtnContent = "Loading...";
  }

  if(error) {
    removeBtnContent = error;
  }

  const itemClickHandler = () => {
    console.log('clicked')
  }

  return (
    <li onClick={itemClickHandler} id={props.id} className={styles['quote-item']}>
      <p>{props.text}</p>
      <span>- {props.author}</span>
      <button className={`${isLoading && styles['disabled-button']}`} onClick={removeQuoteHandler} disabled={isLoading || error}>{removeBtnContent}</button>
    </li>
  )
}

export default QuoteItem