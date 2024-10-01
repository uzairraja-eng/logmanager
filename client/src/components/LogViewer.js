


// import React, { useState, useEffect } from 'react';

// const LogViewer = () => {
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [filterType, setFilterType] = useState('');
//   const [filterSeverity, setFilterSeverity] = useState('');
//   const [socket, setSocket] = useState(null);

//   // Fetch initial logs and setup WebSocket connection
//   useEffect(() => {
//     fetchLogs();
//     connectWebSocket(); // Connect WebSocket for real-time updates
//   }, []);

//   // Apply filters when filterType, filterSeverity, or logs change
//   useEffect(() => {
//     applyFilters();
//   }, [filterType, filterSeverity, logs]);

//   // Fetch logs from the server
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

//   // Connect WebSocket for real-time log updates
//   const connectWebSocket = () => {
//     const ws = new WebSocket('ws://localhost:4000'); // Replace with your WebSocket URL
//     setSocket(ws);

//     ws.onmessage = (event) => {
//       const newLog = JSON.parse(event.data);
//       setLogs((prevLogs) => [newLog, ...prevLogs]); // Prepend the new log
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };
//   };

//   // Apply filter based on log type and severity
//   const applyFilters = () => {
//     let filtered = logs;

//     if (filterType) {
//       filtered = filtered.filter((log) => log.type === filterType);
//     }

//     if (filterSeverity) {
//       filtered = filtered.filter((log) => log.severity === filterSeverity);
//     }

//     setFilteredLogs(filtered);
//   };

//   return (
//     <div>
//       <h2>Logs List</h2>

//       {/* Filters */}
//       <div>
//         <label>
//           Filter by Type:
//           <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//             <option value="">All</option>
//             <option value="Error">Error</option>
//             <option value="info">Info</option>
//             <option value="warning">Warning</option>
//           </select>
//         </label>

//         <label>
//           Filter by Severity:
//           <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
//             <option value="">All</option>
//             <option value="High">High</option>
//             <option value="Medium">Medium</option>
//             <option value="Low">Low</option>
//           </select>
//         </label>
//       </div>

//       <ul>
//         {filteredLogs.map((log) => (
//           <li key={log.id}>
//             {new Date(log.timestamp).toLocaleString()}: {log.type} - {log.message} ({log.severity})
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default LogViewer;






// import React, { useState, useEffect } from 'react';
// import Login from './Login';

// const LogViewer = () => {
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [filterType, setFilterType] = useState('');
//   const [filterSeverity, setFilterSeverity] = useState('');
//   const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');
//   const [socket, setSocket] = useState(null);

//   // Fetch initial logs and setup WebSocket connection
//   useEffect(() => {
//     if (authToken) {
//       fetchLogs();
//       connectWebSocket();
//     }
//   }, [authToken]);

//   useEffect(() => {
//     applyFilters();
//   }, [filterType, filterSeverity, logs]);

//   const fetchLogs = async () => {
//     try {
//       const response = await fetch('http://localhost:4000/api/logs', {
//         headers: { Authorization: `Bearer ${authToken}` },
//       });
//       if (!response.ok) {
//         throw new Error('Failed to fetch logs');
//       }
//       const data = await response.json();
//       setLogs(data);
//     } catch (error) {
//       console.error('Error fetching logs:', error);
//     }
//   };

//   const connectWebSocket = () => {
//     const ws = new WebSocket('ws://localhost:4000');
//     setSocket(ws);

//     ws.onmessage = (event) => {
//       const newLog = JSON.parse(event.data);
//       setLogs((prevLogs) => [newLog, ...prevLogs]);
//     };

//     ws.onclose = () => {
//       console.log('WebSocket connection closed');
//     };

//     ws.onerror = (error) => {
//       console.error('WebSocket error:', error);
//     };
//   };

//   const applyFilters = () => {
//     let filtered = logs;
//     if (filterType) {
//       filtered = filtered.filter((log) => log.type === filterType);
//     }
//     if (filterSeverity) {
//       filtered = filtered.filter((log) => log.severity === filterSeverity);
//     }
//     setFilteredLogs(filtered);
//   };

//   return (
//     <div>
//       {authToken ? (
//         <div>
//           <h2>Logs List</h2>
//           <div>
//             <label>
//               Filter by Type:
//               <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//                 <option value="">All</option>
//                 <option value="Error">Error</option>
//                 <option value="info">Info</option>
//                 <option value="warning">Warning</option>
//               </select>
//             </label>
//             <label>
//               Filter by Severity:
//               <select value={filterSeverity} onChange={(e) => setFilterSeverity(e.target.value)}>
//                 <option value="">All</option>
//                 <option value="High">High</option>
//                 <option value="Medium">Medium</option>
//                 <option value="Low">Low</option>
//               </select>
//             </label>
//           </div>
//           <ul>
//             {filteredLogs.map((log) => (
//               <li key={log.id}>
//                 {new Date(log.timestamp).toLocaleString()}: {log.type} - {log.message} ({log.severity})
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <Login setAuthToken={setAuthToken} />
//       )}
//     </div>
//   );
// };

// export default LogViewer;



// client/src/components/LogViewer.js
import React, { useState, useEffect } from 'react';
import Login from './Login';

const LogViewer = () => {
  // Clear localStorage temporarily for debugging
  localStorage.removeItem('authToken'); // Comment this line out after debugging

  // Check for authToken in localStorage, initialize with '' if not found
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  // Log the initial state of authToken to verify its value
  useEffect(() => {
    console.log('Initial authToken value:', authToken);
  }, []);

  // Fetch logs only if authToken is present
  useEffect(() => {
    if (authToken) {
      console.log('Authenticated! Fetching logs...');
      fetchLogs();
    }
  }, [authToken]);

  // Fetch logs from API
  const fetchLogs = async () => {
    try {
      const response = await fetch('http://meteor-hickory-scapula.glitch.me/api/logs', {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch logs');
      }
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  };

  // State and functions for logs and filtering
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');

  // Function to apply filters to the logs
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

  // Apply filters whenever logs, filterType, or filterSeverity changes
  useEffect(() => {
    applyFilters();
  }, [filterType, filterSeverity, logs]);

  // Display Login page if authToken is not present, otherwise display logs
  return (
    <div>
      {authToken ? (
        <div>
          <h2>Logs List</h2>
          {/* Filter Controls */}
          <div>
            <label>
              Filter by Type:
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="">All</option>
                <option value="Error">Error</option>
                <option value="Info">Info</option>
                <option value="Warning">Warning</option>
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
          {/* Render Logs */}
          <ul>
            {filteredLogs.map((log) => (
              <li key={log.id}>
                {new Date(log.timestamp).toLocaleString()}: {log.type} - {log.message} ({log.severity})
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Show the Login component if no authToken
        <Login setAuthToken={setAuthToken} />
      )}
    </div>
  );
};

export default LogViewer;
