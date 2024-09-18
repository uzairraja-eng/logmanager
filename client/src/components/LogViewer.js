// src/LogViewer.js
import React, { useState, useEffect } from 'react';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      const response = await fetch('http://localhost:4000/api/logs');
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  return (
    <div>
      <h2>Logs List</h2>
      <ul>
        {logs.map((log) => (
          <li key={log._id}>
            {log.timestamp}: {log.type} - {log.message} ({log.severity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogViewer;
