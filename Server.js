var mysql = require('mysql');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'World',
  port: '3306',
};

var dbConnection = mysql.createConnection(dbConfig);

dbConnection.connect(function (err) {
  if (err) {
    console.error('Error connecting to the database: ' + err.stack);
    return;
  }
  console.log('Connected to the database as id ' + dbConnection.threadId);
});

function loginUsers(request, response) {
  var emailid = request.body.emailid;
  var password = request.body.password;

  if (!emailid || !password) {
    return response.status(400).json({ message: 'Email and password are required' });
  }

  dbConnection.query(
    'SELECT * FROM users WHERE emailid = ? AND password = ?',
    [emailid, password],
    function (error, results) {
      if (error) {
        console.log('Login failed: ' + error.message);
        response.status(500).json({ message: 'Login failed' });
      } else {
        if (results.length === 1) {
          console.log('Login successful');
          response.status(200).json({ message: 'Login successful' });
        } else {
          console.log('Login failed: Invalid email or password');
          response.status(401).json({ message: 'Login failed: Invalid email or password' });
        }
      }
    }
  );
}

app.post('/login', loginUsers);

var PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server is running on port ' + PORT);
});
