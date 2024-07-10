import React, { useState, useEffect } from 'react';

import './App.css';

function App() {
  const [displayValue, setDisplayValue] = useState('');

  const append = (value) => {
    setDisplayValue((prev) => prev + value);
  };

  const clear = () => {
    setDisplayValue('');
  };

  const calculateResult = () => {
    try {
      const result = eval(displayValue);
      setDisplayValue(String(result));
    } catch (e) {
      setDisplayValue('ERROR');
    }
  };

  const deleteLast = () => {
    setDisplayValue((prev) => prev.slice(0, -1));
  };

  const handleKeyPress = (event) => {
    const key = event.key;
    if (key >= '0' && key <= '9') {
      append(key);
    } else if (['+', '-', '*', '/', '.', 'Enter', 'c', 'C'].includes(key)) {
      switch (key) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '.':
          append(key);
          break;
        case 'Enter':
          event.preventDefault();
          calculateResult();
          break;
        case 'c':
        case 'C':
          clear();
          break;
        default:
          break;
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [displayValue]);

  return (
    <>
      <h1>Hi-Tech Calculator</h1>
      <div className="container">
        <div className="Calculator">
          <div id="display">
            <input id="displayBox" type="text" value={displayValue} readOnly />
          </div>
          <div className="buttons">
            {[1, 2, 3, '-'].map((item) => (
              <button key={item} className="button" onClick={() => append(item)}>{item}</button>
            ))}
            {[4, 5, 6, '+'].map((item) => (
              <button key={item} className="button" onClick={() => append(item)}>{item}</button>
            ))}
            {[7, 8, 9, '/'].map((item) => (
              <button key={item} className="button" onClick={() => append(item)}>{item}</button>
            ))}
            {['.', 0, '=', '*'].map((item) => (
              <button key={item} className="button" onClick={() => item === '=' ? calculateResult() : append(item)}>{item}</button>
            ))}
            <button className="button" onClick={clear}>C</button>
            <button className="button" onClick={() => append('**')}>^</button>
            <button className="button mod" onClick={() => append('%')}>mod</button>
            <button className="button del" onClick={deleteLast}>del</button>
          </div>
        </div>
        <div className="About">
          <p>Features</p>
          <ul>
            <li>Made with React.Js</li>
            <li>Added EventListeners to take input from keyboard</li>
            <li>Performs modulus and power operations</li>
            <li>Follows BODMAS rule</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default App;
