import { useState, useEffect } from 'react';
import data from '../Data/motivation.json';
import styles from './Motivation.module.css'

const Motivation = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

 const fetchQuote = () => {
  if (!data || !data.quotes || !data.quotes.length) {
    console.error("Error: Invalid data structure");
    return;
  }
  const randomIndex = Math.floor(Math.random() * data.quotes.length);
  const randomQuote = data.quotes[randomIndex];
  setQuote(randomQuote.quote);
  setAuthor(randomQuote.author);
};


  useEffect(() => {
    fetchQuote(); 
    const intervalId = setInterval(fetchQuote, 300000);
    return () => clearInterval(intervalId); 
  }, []);

  return (
    <div className={styles.container}> {/* Apply container style */}
    <h1>Daily Quote</h1>
    <blockquote>
      <p>{quote}</p>
      <footer>{author}</footer>
    </blockquote>
  </div>
  );
};

export default Motivation;
