require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const { Server } = require('socket.io');
const http = require('http');
const app = express();

// Create HTTP server
const server = http.createServer(app);

// Create Socket.IO server
const io = new Server(server, {
  cors: {
    origin: process.env.NODE_ENV === 'production' 
      ? ['http://localhost:3003', 'http://localhost:5173', 'https://fontend-webnc-qsbsybktq-trungtoan46s-projects.vercel.app',
       'https://egamen.vercel.app', 'https://webnc-woad.vercel.app','https://webnc-2kyd6fh65-raazzz.vercel.app']
      : true,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });

  // Add more socket event handlers here
});

// Connect to database
const connectDB = require('./database');
connectDB();

// CORS configuration - Must be before other middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['http://localhost:3003', 'http://localhost:5173',
     'https://fontend-webnc-qsbsybktq-trungtoan46s-projects.vercel.app', 'https://egamen.vercel.app', 'https://webnc-woad.vercel.app','https://webnc-2kyd6fh65-raazzz.vercel.app']
    : true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// Middleware
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET || 'your-secret-key',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URI,
    ttl: 30 * 24 * 60 * 60 // 30 days
  }),
  cookie: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    maxAge: 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
  },
  name: 'sessionId' // Custom cookie name
}));

// Add this after session middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// Import and use routes
const routes = require('./routes');
app.use('/api', routes);

// Default route
app.get('/', (req, res) => {
  res.redirect('/api/products');
});

// For React frontend in production


// Start server
const PORT = process.env.PORT || 5000 ;
server.listen(5000 , () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`WebSocket server is running on ws://localhost:${PORT}`);
});