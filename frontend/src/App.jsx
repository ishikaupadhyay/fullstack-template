import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './App.css';

const API_URL = 'https://fullstack-template-geuq.onrender.com/bfhl';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Options for the multi-select dropdown
  const options = [
    { value: 'Alphabets', label: 'Alphabets' },
    { value: 'Numbers', label: 'Numbers' },
    { value: 'Highest lowercase alphabet', label: 'Highest lowercase alphabet' }
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
    const parsedJson = validateJson(jsonInput);

    if (!parsedJson) return;

    setIsLoading(true);
    try {
      const response = await axios.post(API_URL, parsedJson);
      setResponseData(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch from API');
    } finally {
      setIsLoading(false);
    }
  };

  const renderFilteredResponse = () => {
    if (!responseData) return null;

    const selectedValues = selectedOptions.map(opt => opt.value);
    const filteredContent = {};

    if (selectedValues.includes('Numbers')) {
      filteredContent.Numbers = responseData.numbers;
    }
    if (selectedValues.includes('Alphabets')) {
      filteredContent.Alphabets = responseData.alphabets;
    }
    if (selectedValues.includes('Highest lowercase alphabet')) {
      filteredContent['Highest lowercase alphabet'] = responseData.highest_lowercase_alphabet;
    }

    if (Object.keys(filteredContent).length === 0) return null;

    return (
      <div className="response-container">
        <h3>Filtered Response</h3>
        {Object.entries(filteredContent).map(([key, value]) => (
          <div key={key} className="response-item">
            <strong>{key}:</strong> {value.join(', ') || 'None'}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="container">
      <header>
        <h1>BFHL Challenge</h1>
        <p className="subtitle">Enter JSON data to process</p>
      </header>

      <main className="glass-card">
        <div className="input-group">
          <label htmlFor="json-input">API Input</label>
          <textarea
            id="json-input"
            rows="5"
            placeholder='{ "data": ["A","C","z"] }'
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
          {error && <p className="error-message">{error}</p>}
        </div>

        <button 
          className={`submit-btn ${isLoading ? 'loading' : ''}`} 
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Submit'}
        </button>

        {responseData && (
          <div className="filter-section">
            <label>Multi Filter</label>
            <Select
              isMulti
              options={options}
              className="multi-select"
              onChange={setSelectedOptions}
              placeholder="Select items to display..."
            />
          </div>
        )}

        {renderFilteredResponse()}
      </main>

      <footer>
        <p>Roll Number: 0827CD231039</p>
      </footer>
    </div>
  );
}

export default App;
