"use client"

import { useState, useEffect } from 'react';
import axios from 'axios';

export default function FormDataComponent() {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });

  const [response, setResponse] = useState(null);

  // useEffect example (can be used for side effects if needed)
  useEffect(() => {
    // Example: This could be used for fetching initial data or side effects
    console.log('Component mounted');
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/submit', formData);
      setResponse(res.data);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      {response && (
        <div>
          <h3>Response from API:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
