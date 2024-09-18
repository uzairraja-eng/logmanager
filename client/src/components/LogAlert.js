// src/LogAlert.js
import React, { useEffect, useState } from 'react';
import './LogAlert.css'; // Import CSS for styling

const LogAlert = () => {
  const [logs, setLogs] = useState([]);

  // Fetch logs when component mounts
  useEffect(() => {
    fetchLogs();
  }, []);

  // Function to fetch logs from the backend API
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logs'); // Call the API
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data); // Update state with fetched logs
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // Determine the CSS class based on the log's severity
  const getAlertClass = (severity) => {
    switch (severity) {
      case 'High':
        return 'alert alert-high';
      case 'Medium':
        return 'alert alert-medium';
      case 'Low':
      default:
        return 'alert alert-low';
    }
  };

  return (
    <div>
      <h2>Log Alerts</h2>
      {logs.map((log) => (
        <div key={log._id} className={getAlertClass(log.severity)}>
          <strong>{new Date(log.timestamp).toLocaleString()}</strong>: {log.type} - {log.message} ({log.severity})
        </div>
      ))}
    </div>
  );
};

export default LogAlert;
