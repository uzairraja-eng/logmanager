// const express = require('express');
// const { faker } = require('@faker-js/faker'); 
// const cors = require('cors');
// const mongoose = require('mongoose'); // Import Mongoose
// const bodyParser = require('body-parser'); // For parsing JSON request bodies
// const app = express();
// const PORT = 4000;

// //project
// app.use(cors());
// app.use(bodyParser.json());

// const mongoURI = 'mongodb://localhost:27017/logsdb';

// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

//   // Define Mongoose Schema and Model for Logs
// const logSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   timestamp: { type: Date, required: true },
//   type: { type: String, required: true },
//   message: { type: String, required: true },
//   severity: { type: String, required: true }
// });

// const Log = mongoose.model('Log', logSchema);


// // Route to create a new log entry
// app.post('/api/logs', async (req, res) => {
//   const { id, timestamp, type, message, severity } = req.body;

//   try {
//     const newLog = new Log({ id, timestamp, type, message, severity });
//     await newLog.save();
//     res.status(201).json({ message: 'Log entry created successfully', log: newLog });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create log entry', details: error.message });
//   }
// });


// // Route to retrieve all log entries
// app.get('/api/logs', async (req, res) => {
//   try {
//     const logs = await Log.find();
//     res.status(200).json(logs);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve log entries', details: error.message });
//   }
// });


// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });



// const express = require('express');
// const { faker } = require('@faker-js/faker'); 
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const { Server } = require('ws'); // WebSocket Server

// const app = express();
// const PORT = 4000;

// // Setup CORS, body-parser, and MongoDB
// app.use(cors());
// app.use(bodyParser.json());

// const mongoURI = 'mongodb://localhost:27017/logsdb';
// mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.log('MongoDB connection error:', err));

// // Define Mongoose Schema and Model for Logs
// const logSchema = new mongoose.Schema({
//   id: { type: String, required: true },
//   timestamp: { type: Date, required: true },
//   type: { type: String, required: true },
//   message: { type: String, required: true },
//   severity: { type: String, required: true }
// });

// const Log = mongoose.model('Log', logSchema);

// // Create a new log entry
// app.post('/api/logs', async (req, res) => {
//   const { id, timestamp, type, message, severity } = req.body;

//   try {
//     const newLog = new Log({ id, timestamp, type, message, severity });
//     await newLog.save();

//     // Send new log to all connected WebSocket clients
//     wss.clients.forEach(client => {
//       if (client.readyState === 1) { // Check if the connection is open
//         client.send(JSON.stringify(newLog));
//       }
//     });

//     res.status(201).json({ message: 'Log entry created successfully', log: newLog });
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to create log entry', details: error.message });
//   }
// });

// // Retrieve all logs
// app.get('/api/logs', async (req, res) => {
//   try {
//     const logs = await Log.find();
//     res.status(200).json(logs);
//   } catch (error) {
//     res.status(500).json({ error: 'Failed to retrieve log entries', details: error.message });
//   }
// });

// // Start the server
// const server = app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// // WebSocket setup
// const wss = new Server({ server }); // WebSocket Server

// wss.on('connection', (ws) => {
//   console.log('New client connected');
  
//   ws.on('close', () => {
//     console.log('Client disconnected');
//   });
// });







const express = require('express');
const { faker } = require('@faker-js/faker');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Server } = require('ws');
const dotenv = require('dotenv');
const { protectRoute } = require('./middleware/auth'); // Import the middleware

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 4000;

// Setup CORS, body-parser, and MongoDB
app.use(cors({ origin: 'https://logmanager-frontend.netlify.app' }));

app.use(bodyParser.json());

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/logsdb';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

// Load Authentication Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Define Mongoose Schema and Model for Logs
const logSchema = new mongoose.Schema({
  id: { type: String, required: true },
  timestamp: { type: Date, required: true },
  type: { type: String, required: true },
  message: { type: String, required: true },
  severity: { type: String, required: true }
});

const Log = mongoose.model('Log', logSchema);

// Create a new log entry (protected route)
app.post('/api/logs', protectRoute, async (req, res) => {
  const { id, timestamp, type, message, severity } = req.body;

  try {
    const newLog = new Log({ id, timestamp, type, message, severity });
    await newLog.save();

    // Send new log to all connected WebSocket clients
    wss.clients.forEach(client => {
      if (client.readyState === 1) { // Check if the connection is open
        client.send(JSON.stringify(newLog));
      }
    });

    res.status(201).json({ message: 'Log entry created successfully', log: newLog });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create log entry', details: error.message });
  }
});

// Retrieve all logs (protected route)
app.get('/api/logs', protectRoute, async (req, res) => {
  try {
    const logs = await Log.find();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve log entries', details: error.message });
  }
});

// Start the server
const server = app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// WebSocket setup
const wss = new Server({ server }); // WebSocket Server

wss.on('connection', (ws) => {
  console.log('New client connected');
  
  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
