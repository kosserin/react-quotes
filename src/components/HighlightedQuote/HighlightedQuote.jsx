import React, {useState, useContext} from 'react';
import { Link, useParams } from 'react-router-dom';
import { QuotesContext } from '../../store/quotes-context';
import NewComment from '../NewComment/NewComment';
import NotFound from '../NotFound/NotFound';

import styles from './HighlightedQuote.module.css';

const HighlightedQuote = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const {id} = useParams();
  const ctx = useContext(QuotesContext);
  const filteredComments = ctx.comments.filter(c => c.quoteId === id);
  const [doesExist, setDoesExist] = useState(ctx.quotes.find(q => q.id === id));
  console.log(doesExist)

  const highlighted = ctx.quotes.find(quote => quote.id === id);
 
  const removeData = async (key, id) => {
    try {
      setError(null);
      setIsLoading(true);
      const response = await fetch(`https://react-quotes-994eb-default-rtdb.europe-west1.firebasedatabase.app/comments/${key}.json`, {
          method: "DELETE",
      });
      if(!response.ok) {
          throw new Error;
      }
      ctx.removeComment(id);
      } catch (err) {
          setError(err.message || "Something went wrong!");
      }
      setIsLoading(false);
  }

  const removeCommentHandler = (e) => {
    const currentTargetId = e.currentTarget.id;
    const foundComment = filteredComments.find(c => c.id == currentTargetId);
    removeData(foundComment.objectKey, currentTargetId);
  }

  let commentsContent = filteredComments.map(c => {
    return <li onClick={removeCommentHandler} key={c.id} id={c.id}>{c.text}</li>
  })

  if(filteredComments.length === 0) {
    commentsContent = <p>There are no comments yet. Be the first to talk about this quote.</p>
  }

  let infoContent;

  if(isLoading) {
    infoContent = <p>Removing comment...</p>
  }

  if(error) {
    infoContent = <p className={styles['error-text']}>{error}</p>
  }

  return (
    doesExist ? <section className={styles['highlighted-quote']}>
    <p>{highlighted.text}</p>
    <span>-{highlighted.author}</span>
    <div className={styles.actions}>
      <Link to="/">Go back</Link>
    </div>
    <NewComment />
    <ul>
    {infoContent}
      {commentsContent}
    </ul>
  </section> : <NotFound />
  )
}

export default HighlightedQuote