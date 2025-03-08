import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [amount, setAmount] = useState(0);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(0);

  const handleConvert = async () => {
    const response = await fetch(
      `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
    );
    const data = await response.json();
    const conversionRate = data.rates[toCurrency];
    setConvertedAmount(amount * conversionRate);
  };

  useEffect(() => {
    handleConvert();
  }, [fromCurrency, toCurrency]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Currency Converter</h1>
        <div className="converter">
          
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
          />
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="INR">INR</option>
          </select>
          <button onClick={handleConvert}>Convert</button>
        </div>
        <div className="result">
          <h2>Converted Amount: {convertedAmount} {toCurrency}</h2>
        </div>
      </header>
    </div>
  );
}

export default App;