import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' },
  ];

  useEffect(() => {
    document.title = "0827CD231039";
  }, []);

  const validateJson = (input) => {
    try {
      const parsed = JSON.parse(input);
      if (!parsed.data || !Array.isArray(parsed.data)) {
        throw new Error('JSON must contain a "data" array');
      }
      return parsed;
    } catch (e) {
      setError(e.message);
      return null;
    }
  };

  const handleSubmit = async () => {
    setError('');
    setResponseData(null);
    
    const validatedData = validateJson(jsonInput);
    if (!validatedData) return;

    try {
      const response = await axios.post('https://fullstack-template-geuq.onrender.com/bfhl', validatedData);
      setResponseData(response.data);
    } catch (err) {
      setError('API Call Failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const filteredData = {};
    const selectedValues = selectedOptions.map(opt => opt.value);

    if (selectedValues.includes('Alphabets')) {
      filteredData.alphabets = responseData.alphabets;
    }
    if (selectedValues.includes('Numbers')) {
      filteredData.numbers = responseData.numbers;
    }
    if (selectedValues.includes('Highest lowercase alphabet')) {
      filteredData.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }

    return (
      <div className="response-container">
        {Object.entries(filteredData).map(([key, value]) => (
          <div key={key} className="response-item">
            <strong>{key.replace(/_/g, ' ').toUpperCase()}:</strong>
            <span>{JSON.stringify(value)}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <header>
        <h1>BFHL Challenge</h1>
        <p className="subtitle">Roll Number: 0827CD231039</p>
      </header>

      <main className="glass-card">
        <div className="input-group">
          <label htmlFor="json-input">API Input</label>
          <textarea
            id="json-input"
            placeholder='{"data": ["M", "1", "a"]}'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          {error && <p className="error-text">{error}</p>}
          <button className="submit-btn" onClick={handleSubmit}>Submit</button>
        </div>

        {responseData && (
          <div className="filter-group">
            <label>Multi Filter</label>
            <Select
              isMulti
              options={options}
              onChange={setSelectedOptions}
              className="multi-select"
              placeholder="Select fields to display..."
            />
          </div>
        )}

        {renderFilteredResponse()}
      </main>
    </div>
  );
};

export default App;
