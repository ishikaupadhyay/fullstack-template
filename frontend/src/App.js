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
        <h3 className="section-title">Filtered Response</h3>
        {Object.entries(filteredContent).map(([key, value]) => (
          <div key={key} className="response-card">
            <span className="card-label">{key}:</span>
            <span className="card-value">{value.join(', ') || 'None'}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="app-container">
      <div className="content-wrapper">
        <header className="app-header">
          <h1>BFHL API Tool</h1>
          <p className="roll-info">Submission by 0827CD231039</p>
        </header>

        <section className="input-section glass-panel">
          <div className="input-field">
            <label>API JSON Input</label>
            <textarea
              className="json-textarea"
              placeholder='Example: { "data": ["A","1","z"] }'
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
            />
            {error && <div className="error-text">{error}</div>}
          </div>

          <button 
            className={`btn-primary ${isLoading ? 'btn-loading' : ''}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Submit Request'}
          </button>
        </section>

        {responseData && (
          <section className="filter-section glass-panel">
            <div className="filter-field">
              <label>Select Fields to Display</label>
              <Select
                isMulti
                options={options}
                className="custom-select"
                classNamePrefix="select"
                onChange={setSelectedOptions}
                placeholder="Choose options..."
              />
            </div>
            {renderFilteredResponse()}
          </section>
        )}
      </div>
    </div>
  );
}

export default App;
