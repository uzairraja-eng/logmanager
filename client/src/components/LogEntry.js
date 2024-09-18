// src/LogEntry.js
import React, { useState, useEffect } from 'react';

const LogEntry = () => {
  const [logData, setLogData] = useState({
    id: '',
    type: '',
    message: '',
    severity: 'low', // Default to 'low'
    timestamp: new Date().toISOString(), // Current timestamp
  });

  const [logs, setLogs] = useState([]); // State to hold all logs from the backend

  // Fetch logs from the backend when the component mounts
  useEffect(() => {
    fetchLogs();
  }, []);

  // Fetch logs from the backend API
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logs');
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data); // Set logs state with data from the API
    } catch (error) {
      console.error('Error fetching logs:', error);
      alert('Failed to retrieve logs');
    }
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogData({
      ...logData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create new log entry
    const newLogEntry = {
      ...logData,
      timestamp: new Date().toISOString(), // Ensure the timestamp is current
    };

    try {
      const response = await fetch('http://localhost:4000/api/logs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLogEntry), // Send form data as JSON
      });

      if (!response.ok) {
        throw new Error('Failed to save log entry');
      }

      const data = await response.json();
      alert('Log entry created successfully!');
      console.log('Created log:', data);

      // After a successful POST, fetch the updated list of logs
      fetchLogs();

      // Reset form after submission
      setLogData({
        id: '',
        type: '',
        message: '',
        severity: 'low',
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error('Error saving log:', error);
      alert('Failed to save log entry');
    }
  };

  return (
    <div>
      <h2>Create Log Entry</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="id"
            value={logData.id}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Type:</label>
          <input
            type="text"
            name="type"
            value={logData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            name="message"
            value={logData.message}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Severity:</label>
          <select
            name="severity"
            value={logData.severity}
            onChange={handleInputChange}
            required
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div>
          <button type="submit">Add Log Entry</button>
        </div>
      </form>

      {/* Display logs in a table */}
      <h3>Log Entries</h3>
      {logs.length > 0 ? (
        <table border="1" cellPadding="5" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Type</th>
              <th>Message</th>
              <th>Severity</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log._id}>
                <td>{log.id}</td>
                <td>{log.type}</td>
                <td>{log.message}</td>
                <td>{log.severity}</td>
                <td>{new Date(log.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No logs available.</p>
      )}
    </div>
  );
};

export default LogEntry;
