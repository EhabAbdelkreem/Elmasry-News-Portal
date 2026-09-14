const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Database storage directory
const DB_DIR = path.join(__dirname, 'db');
const DB_FILE = path.join(DB_DIR, 'database.json');

// Ensure database directory exists
if (!fs.existsSync(DB_DIR)) {
  fs.mkdirSync(DB_DIR, { recursive: true });
}

// Function to read data from JSON file
function readDb() {
  try {
    if (fs.existsSync(DB_FILE)) {
      const raw = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error('Error reading database file:', error);
  }
  return {};
}

// Function to write data to JSON file
function writeDb(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (error) {
    console.error('Error writing to database file:', error);
    return false;
  }
}

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Al-Masry News Backend API'
  });
});

// GET all collections or entire database
app.get('/api/db', (req, res) => {
  const db = readDb();
  res.json({ success: true, data: db });
});

// GET a specific collection (e.g. /api/db/articles)
app.get('/api/db/:collection', (req, res) => {
  const { collection } = req.params;
  const db = readDb();
  res.json({ success: true, collection, data: db[collection] || [] });
});

// POST or PUT to sync entire collection or specific key
app.post('/api/db/:collection', (req, res) => {
  const { collection } = req.params;
  const body = req.body;
  const db = readDb();
  db[collection] = body.data !== undefined ? body.data : body;
  const success = writeDb(db);
  res.json({ success, collection, count: Array.isArray(db[collection]) ? db[collection].length : 1 });
});

// POST to sync all collections at once
app.post('/api/db-sync-all', (req, res) => {
  const collections = req.body;
  const db = readDb();
  Object.assign(db, collections);
  const success = writeDb(db);
  res.json({ success, message: 'All database collections synced successfully' });
});

// Serve frontend static build if exists
const FRONTEND_DIST = path.join(__dirname, '../dist');
if (fs.existsSync(FRONTEND_DIST)) {
  app.use(express.static(FRONTEND_DIST));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    const indexFile = path.join(FRONTEND_DIST, 'index.html');
    if (fs.existsSync(indexFile)) {
      res.sendFile(indexFile);
    } else {
      next();
    }
  });
}

// Start backend server
const server = app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🚀 Al-Masry News Fullstack Backend Server Running`);
  console.log(`📡 Port: ${PORT}`);
  console.log(`💾 Database file: ${DB_FILE}`);
  console.log(`🔗 Health check: http://localhost:${PORT}/api/health`);
  console.log(`====================================================`);
});

module.exports = { app, server };
