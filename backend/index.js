// // const express = require('express');
// // const connectDB = require('./config/db');
// // const cors = require('cors');
// // require('dotenv').config();

// // // Route files
// // const educationRoutes = require('./routes/educationRoutes');
// // // After other route imports
// // const projectRoutes = require('./routes/projectRoutes');

// // // Mount routers
// // app.use('/api/v1/projects', projectRoutes);
// // // Connect to database
// // connectDB();

// // const app = express();

// // // Body parser
// // app.use(express.json());

// // // Enable CORS
// // app.use(cors());

// // // Mount routers
// // app.use('/api/v1/education', educationRoutes);

// // const PORT = process.env.PORT || 5000;

// // const server = app.listen(
// //   PORT,
// //   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// // );

// // // Handle unhandled promise rejections
// // process.on('unhandledRejection', (err, promise) => {
// //   console.log(`Error: ${err.message}`);
// //   // Close server & exit process
// //   server.close(() => process.exit(1));
// // });
// const express = require('express');
// const connectDB = require('./config/db');
// const cors = require('cors');
// require('dotenv').config();

// // Route files
// const educationRoutes = require('./routes/educationRoutes');
// const projectRoutes = require('./routes/projectRoutes');

// // Connect to database
// connectDB();

// // Initialize express app
// const app = express();

// // Body parser
// app.use(express.json());

// // Enable CORS
// app.use(cors());

// // Mount routers
// app.use('/api/v1/education', educationRoutes);
// app.use('/api/v1/projects', projectRoutes);

// const PORT = process.env.PORT || 5000;

// const server = app.listen(
//   PORT,
//   console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
// );

// // Handle unhandled promise rejections
// process.on('unhandledRejection', (err, promise) => {
//   console.log(`Error: ${err.message}`);
//   // Close server & exit process
//   server.close(() => process.exit(1));
// });

const express = require('express');
const path = require('path');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

// Route files
const educationRoutes = require('./routes/educationRoutes');
const projectRoutes = require('./routes/projectRoutes');
const highlightRoutes = require('./routes/highlightRoutes');

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Mount routers
app.use('/api/v1/education', educationRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/highlights', highlightRoutes);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});