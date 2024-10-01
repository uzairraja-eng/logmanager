

// // client/src/components/LogViewer.js
// import React, { useState, useEffect } from 'react';
// import Login from './Login';

// const LogViewer = () => {

//   // // Clear localStorage temporarily for debugging
//   // localStorage.removeItem('authToken'); // Comment this line out after debugging

//   // Check for authToken in localStorage, initialize with '' if not found
//   const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

//   // Log the initial state of authToken to verify its value
//   useEffect(() => {
//     console.log('Initial authToken value:', authToken);
//   }, []);

//   // Fetch logs only if authToken is present
//   useEffect(() => {
//     if (authToken) {
//       console.log('Authenticated! Fetching logs...');
//       fetchLogs();
//     }
//   }, [authToken]);

//   // Fetch logs from API
//   const fetchLogs = async () => {
//     try {
//       const response = await fetch('http://meteor-hickory-scapula.glitch.me/api/logs', {
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

//   // State and functions for logs and filtering
//   const [logs, setLogs] = useState([]);
//   const [filteredLogs, setFilteredLogs] = useState([]);
//   const [filterType, setFilterType] = useState('');
//   const [filterSeverity, setFilterSeverity] = useState('');

//   // Function to apply filters to the logs
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

//   // Apply filters whenever logs, filterType, or filterSeverity changes
//   useEffect(() => {
//     applyFilters();
//   }, [filterType, filterSeverity, logs]);

//   // Display Login page if authToken is not present, otherwise display logs
//   return (
//     <div>
//       {authToken ? (
//         <div>
//           <h2>Logs List</h2>
//           {/* Filter Controls */}
//           <div>
//             <label>
//               Filter by Type:
//               <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
//                 <option value="">All</option>
//                 <option value="Error">Error</option>
//                 <option value="Info">Info</option>
//                 <option value="Warning">Warning</option>
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
//           {/* Render Logs */}
//           <ul>
//             {filteredLogs.map((log) => (
//               <li key={log.id}>
//                 {new Date(log.timestamp).toLocaleString()}: {log.type} - {log.message} ({log.severity})
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         // Show the Login component if no authToken
//         <Login setAuthToken={setAuthToken} />
//       )}
//     </div>
//   );
// };

// export default LogViewer;




//for netlify

import React, { useState, useEffect, useCallback } from 'react';
import Login from './Login';

const LogViewer = () => {
  // Remove this line after debugging to avoid clearing authToken each time.
  // localStorage.removeItem('authToken'); // Commented out after debugging

  // Check for authToken in localStorage, initialize with '' if not found
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken') || '');

  // State and functions for logs and filtering
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [filterType, setFilterType] = useState('');
  const [filterSeverity, setFilterSeverity] = useState('');

  // Log the initial state of authToken to verify its value
  useEffect(() => {
    console.log('Initial authToken value:', authToken);
  }, [authToken]); // Add 'authToken' as a dependency

  // Fetch logs from API
  const fetchLogs = useCallback(async () => {
    if (!authToken) return;

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
  }, [authToken]); // Add 'authToken' as a dependency for fetchLogs

  // Fetch logs only if authToken is present
  useEffect(() => {
    fetchLogs();
  }, [authToken, fetchLogs]); // Add 'authToken' and 'fetchLogs' as dependencies

  // Function to apply filters to the logs
  const applyFilters = useCallback(() => {
    let filtered = logs;
    if (filterType) {
      filtered = filtered.filter((log) => log.type === filterType);
    }
    if (filterSeverity) {
      filtered = filtered.filter((log) => log.severity === filterSeverity);
    }
    setFilteredLogs(filtered);
  }, [logs, filterType, filterSeverity]); // Add dependencies for logs, filterType, and filterSeverity

  // Apply filters whenever logs, filterType, or filterSeverity changes
  useEffect(() => {
    applyFilters();
  }, [logs, filterType, filterSeverity, applyFilters]); // Add 'applyFilters' as a dependency

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
