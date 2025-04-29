const mysql = require('mysql2/promise');

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root', // use your password
  database: 'keykoders', // your database name
});

module.exports = db;
