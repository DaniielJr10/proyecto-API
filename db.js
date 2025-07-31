const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'tienda',
  charset: 'utf8mb4'
});
connection.connect(error => {
  if (error) throw error;
  console.log('Conexión exitosa a la base de datos.');
});
module.exports = connection;