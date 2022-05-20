import React, {useState, useEffect} from 'react';

export const QuotesContext = React.createContext({
    quotes: [],
    comments: [],
    error: null,
    isLoading: false,
    addQuote: (quoteObj) => {},
    addComment: (commObj) => {},
    removeQuote: (id) => {},
    removeComment: (id) => {},
});

export default props => {

    const [quotes, setQuotes] = useState([]);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const fetchQuotes = async () => {
        try {
        setError(null);
        setIsLoading(true);
        const response = await fetch("https://react-quotes-994eb-default-rtdb.europe-west1.firebasedatabase.app/quotes.json", {
            method: "GET"
        });
        if(!response.ok) {
            throw new Error;
        }
        const data = await response.json();
        const loadedQuotes = [];
        for(const key in data) {
            loadedQuotes.push({
                id: data[key].id,
                text: data[key].text,
                author: data[key].author,
                objectKey: key,
            })
        }
        setQuotes(loadedQuotes)
        } catch (err) {
            setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
    }

    const fetchComments = async () => {
        try {
        setError(null);
        setIsLoading(true);
        const response = await fetch("https://react-quotes-994eb-default-rtdb.europe-west1.firebasedatabase.app/comments.json", {
            method: "GET"
        });
        if(!response.ok) {
            throw new Error;
        }
        const data = await response.json();
        const loadedComments = [];
        for(const key in data) {
            loadedComments.push({
                id: data[key].id,
                text: data[key].text,
                quoteId: data[key].quoteId,
                objectKey: key,
            })
        }
        setComments(loadedComments)
        } catch (err) {
            setError(err.message || "Something went wrong!");
        }
        setIsLoading(false);
    }

    useEffect(() => {
        fetchQuotes();
        fetchComments();
    }, []);

    const onAddQuoteHandler = (quoteObj) => {
        setQuotes(prevQuotes => {
            return prevQuotes.concat(quoteObj)
        })
    }
    
    const onRemoveQuoteHandler = (id) => {
        setQuotes(prevQuotes => {
            return prevQuotes.filter(item => item.id !== id);
        })
    }

    const onAddCommentHandler = (commentsObj) => {
        setComments(prevComments => {
            return prevComments.concat(commentsObj)
        })
    }

    const onRemoveCommentHandler = (id) => {
        setComments(prevComments => {
            return prevComments.filter(item => item.id !== id);
        })
    }

    return (
        <QuotesContext.Provider value={{
            quotes: quotes,
            comments: comments,
            error: error,
            isLoading: isLoading,
            addQuote: onAddQuoteHandler,
            addComment: onAddCommentHandler,
            removeQuote: onRemoveQuoteHandler,
            removeComment: onRemoveCommentHandler,
        }}>
        {props.children}
        </QuotesContext.Provider>
    )
}