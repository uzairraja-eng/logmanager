// // src/LogViewer.js
// import React, { useState, useEffect } from 'react';

// const LogViewer = () => {
//   const [logs, setLogs] = useState([]);

//   useEffect(() => {
//     fetchLogs();
//   }, []);

//   const fetchLogs = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/logs');
//       if (!response.ok) {
//         throw new Error('Failed to fetch logs');
//       }
//       const data = await response.json();
//       setLogs(data);
//     } catch (error) {
//       console.error('Error fetching logs:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Logs List</h2>
//       <ul>
//         {logs.map((log) => (
//           <li key={log._id}>
//             {log.timestamp}: {log.type} - {log.message} ({log.severity})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LogViewer;





import React, { useState, useEffect } from 'react';

const LogViewer = () => {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');
  const [socket, setSocket] = useState(null);

  // Fetch initial logs and setup WebSocket connection
  useEffect(() => {
    fetchLogs();
    connectWebSocket(); // Connect WebSocket for real-time updates
  }, []);

  // Apply filters when filterType, filterSeverity, or logs change
  useEffect(() => {
    applyFilters();
  }, [filterType, filterSeverity, logs]);

  // Fetch logs from the server
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

  // Connect WebSocket for real-time log updates
  const connectWebSocket = () => {
    const ws = new WebSocket('ws://localhost:4000'); // Replace with your WebSocket URL
    setSocket(ws);

    ws.onmessage = (event) => {
      const newLog = JSON.parse(event.data);
      setLogs((prevLogs) => [newLog, ...prevLogs]); // Prepend the new log
    };

    ws.onclose = () => {
      console.log('WebSocket connection closed');
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  };

  // Apply filter based on log type and severity
  const applyFilters = () => {
    let filtered = logs;

    if (filterType) {
      filtered = filtered.filter((log) => log.type === filterType);
    }

    if (filterSeverity) {
      filtered = filtered.filter((log) => log.severity === filterSeverity);
    }

    setFilteredLogs(filtered);
  };

  return (
    <div>
      <h2>Logs List</h2>

      {/* Filters */}
      <div>
        <label>
          Filter by Type:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="">All</option>
            <option value="Error">Error</option>
            <option value="info">Info</option>
            <option value="warning">Warning</option>
          </select>
        </label>

        <label>
          Filter by Severity:
          <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
            <option value="">All</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>
        </label>
      </div>

      <ul>
        {filteredLogs.map((log) => (
          <li key={log.id}>
            {new Date(log.timestamp).toLocaleString()}: {log.type} - {log.message} ({log.severity})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LogViewer;
