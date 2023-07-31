// importing necessary modules
const express = require('express'); 
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
const port = 3000;

// setup mysql connection configuration
const db = mysql.createConnection({
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
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

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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
  const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error('Error logging in: ', err);
      res.status(500).send('Error logging in.');
      return;
    }
    if (result.length === 0) {
      res.status(401).send('Invalid username or password.');
      return;
    }
    res.status(200).send('Login successful.');
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});