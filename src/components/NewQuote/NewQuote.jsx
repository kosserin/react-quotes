import React, { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {QuotesContext} from '../../store/quotes-context';
import { v4 as uuid } from 'uuid';

import styles from './NewQuote.module.css';

const NewQuote = () => {

  const ctx = useContext(QuotesContext);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const textInputRef = useRef();
  const authorInputRef = useRef();
  const navigate = useNavigate();

  const sendQuote = async (obj) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch("https://react-quotes-994eb-default-rtdb.europe-west1.firebasedatabase.app/quotes.json", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
          "Content-Type": "application/json"
        }
      });
      if(!response.ok) {
        throw new Error;
      }
      navigate("/");
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  }

  const onQuoteSubmitHandler = e => {
    e.preventDefault();
    const textValue = textInputRef.current.value;
    const authorValue = authorInputRef.current.value;
    const uniqueId = uuid();
    const smallId = uniqueId.slice(0,8);
    const newQuoteObj = {
      id: `q${smallId}`,
      author: authorValue,
      text: textValue
    }
    ctx.addQuote(newQuoteObj);
    sendQuote(newQuoteObj);
  }

  let content = "";

  if(isLoading) {
    content = "Loading...";
  }

  if(error) {
    content = error;
  }

  return (
    <section className={styles['new-quote']}>
      <form className={styles['new-quote__form']} onSubmit={onQuoteSubmitHandler}>
      <div className={styles['form-group']}>
        <label htmlFor='qAuthor'>Enter quote author:</label>
        <input ref={authorInputRef} type="text" id="qAuthor" required />
      </div>
      <div className={styles['form-group']}>
        <label htmlFor='qText'>Enter quote text:</label>
        <textarea ref={textInputRef} id="qText" required />
      </div>
      <button className={`${isLoading && styles['disabled-button']}`} disabled={isLoading} type="submit">Add quote</button>
      <p className={`${error && styles['error-message']}`}>{content}</p>
    </form>
    </section>
  )
}

export default NewQuote