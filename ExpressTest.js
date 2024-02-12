const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbConfig = {
  host:'localhost',
  database:'world',
      user:'root',
      password:'root',
      port:'3306'
};

const connection = mysql.createConnection(dbConfig);

connection.connect((error) => {
  if (error) {
    console.error('Database connection failed: ' + error.message);
  } else {
    console.log('Connected to Database');
  }
});

function loginUser(request, response) {
  const { username, password } = request.body;

  // Query the database to find a user with the provided username and password
  const sql = 'SELECT * FROM userlogin WHERE userid = ? AND password = ?';
  connection.query(sql, [username, password], (error, results) => {
    if (error) {
      console.log('Login failed: ' + error.message);
      return response.status(500).json({ message: 'Login failed' });
    }
    if (results.length === 1) {
      console.log('Login successful');
      return response.status(200).json({ message: 'Login successful' });
    } else {
      console.log('Login failed: Invalid username or password');
      return response.status(401).json({ message: 'Login failed: Invalid username or password' });
    }
  });
}

app.post('/login', loginUser);

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
