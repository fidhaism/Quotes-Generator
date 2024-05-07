import React, { useState, useEffect } from 'react';
import { Button, Typography, Spin } from 'antd';
import './App.css';

const { Title } = Typography;

function App() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://dummyjson.com/quotes');
      const data = await response.json();
      // Assuming the data structure has an array of objects with keys id, quote, and author
      const { quotes } = data;
      if (quotes && Array.isArray(quotes) && quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const { quote } = quotes[randomIndex];
        setQuote(quote);
      } else {
        console.error('Invalid data format:', data);
      }
      setLoading(false);
    } catch (error) {
      console.error('Error fetching quote:', error);
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <Title level={2}>Quotes Generator</Title>
      <div className="quote-container">
        {loading ? (
          <div className="spin-container">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Title level={4}>{quote}</Title>
            <Button className="generate-button" type="primary" onClick={fetchQuote}>Generate Quote</Button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
