// Importing necessary modules
const express = require('express'); 
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const session = require('express-session');

const app = express();
const port = 3000;

// Setup mysql connection configuration
const db = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'password',
  database: 'user_registration',
  port: '3306',
});

// Response messages for connection status
db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database: ', err);
    return;
  }
  console.log('Connected to MySQL database.');
});

// Set parsing for JSON data requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'session_key', // placeholder key
    resave: false,
    saveUninitialized: true,
  })
);

// Register a new user
app.post('/register', (req, res) => {
  const { username, password } = req.body;
  const user = { username, password };
  const sql = 'INSERT INTO users SET ?';
  db.query(sql, user, (err, result) => {
    if (err) {
      console.error('Error registering user: ', err);
      res.status(500).send('Error registering user.');
      return;
    }
    res.status(201).send('User registered successfully.');
  });
});

// Login function
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  // Selecting users which match the credentials
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    // If the user is found, set the user data in the session to simulate successful login
    req.session.user = {
      id: result[0].id, //id is the primary key of my user_registration database
      username: result[0].username,
    }
    // Error handling and status response
    if (err) {
      console.error('Error logging in: ', err);
      res.status(500).send('Error logging in.');
      return;
    }
    // Returns error if the password section has no input
    if (result.length === 0) {
      res.status(401).send('Invalid username or password.');
      return;
    }
    res.status(200).send('Login successful.');
  });
});

// // Logout function
  app.post('/logout', (req, res) => {
    if (!req.session.user) {
      // If the user is not logged in, they cannot log out.
      return res.status(401).send('You are not logged in.');
    }
  
    // If the user is logged in, clear the session to simulate log out
    req.session.destroy((err) => {
      if (err) {
        console.error('Error while logging out: ', err);
        return res.status(500).send('An error occurred while logging out.');
      }
      res.status(200).send('Logged out successfully.');
    });
  });

/* app.get('/', (req, res) => {
  res.status(200).send("test");
}) */


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});