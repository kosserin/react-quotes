import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Quotes from './components/Quotes/Quotes';
import NewQuote from './components/NewQuote/NewQuote';
import NotFound from './components/NotFound/NotFound';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import HighlightedQuote from './components/HighlightedQuote/HighlightedQuote';

const App = () => {

  return (
    <React.Fragment>
    <Header />
      <Routes>
        <Route path='*' element={<NotFound />} />
        <Route path=':id' element={<HighlightedQuote />} />
        <Route path='/' element={<Quotes />} />
        <Route path='/new-quote' element={<NewQuote />} />
      </Routes>
      <Footer />
    </React.Fragment>
  )
}

export default App
