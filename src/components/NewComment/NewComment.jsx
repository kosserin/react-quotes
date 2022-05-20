import React, {useState, useRef, useContext} from 'react';
import { useParams } from 'react-router-dom';
import { QuotesContext } from '../../store/quotes-context';
import { v4 as uuid } from 'uuid';

import styles from './NewComment.module.css';

const NewComment = () => {

    const commentValueRef = useRef();
    const {id} = useParams();
    const ctx = useContext(QuotesContext);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const sendComment = async () => {
      try {
        setError(null);
        setIsLoading(true);
        const textValue = commentValueRef.current.value;
        const uniqueId = uuid();
        const smallId = uniqueId.slice(0,8);
        const newCommentObj = {
          id: `c${smallId}`,
          text: textValue,
          quoteId: id,
        }
        const response = await fetch(`https://react-quotes-994eb-default-rtdb.europe-west1.firebasedatabase.app/comments.json`, {
          method: "POST",
          body: JSON.stringify(newCommentObj),
          headers: {
            "Content-Type": "application/json"
          }
        });
        if(!response.ok) {
          throw new Error;
        }
        const data = await response.json();
        ctx.addComment({...newCommentObj, objectKey: data.name});
      } catch (err) {
        setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
    }

    const commentSubmitHandler = e => {
        e.preventDefault();
        sendComment();
    }

    let buttonContent = "Post a comment";

    if(isLoading) {
      buttonContent = "Loading..."
    }

    if(error) {
      buttonContent = error;
    }

  return (
    <form className={styles['new-comment']} onSubmit={commentSubmitHandler}>
        <textarea ref={commentValueRef} required />
        <button className={`${isLoading && styles['disabled-button']} ${error && styles['error-button']}`} disabled={isLoading} type="submit">{buttonContent}</button>
    </form>
  )
}

export default NewComment