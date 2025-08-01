
const bcrypt = require('bcrypt');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const db = require('./models/db');

const app = express();
const port = 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // Servir archivos estáticos

// Ruta de login con validación de hash
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const sql = 'SELECT * FROM usuarios WHERE username = ?';
  
  db.query(sql, [username], async (err, results) => {
    if (err) {
      console.error('Error en login:', err);
      return res.status(500).json({ success: false, message: 'Error del servidor' });
    }
    
    if (results.length === 0) {
      return res.status(401).json({ success: false, message: 'Usuario no encontrado' });
    }
    
    const usuario = results[0];
    const contraseniaValida = await bcrypt.compare(password, usuario.password);
    
    if (contraseniaValida) {
      res.json({ success: true, token: 'token123', username: usuario.username });
    } else {
      res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
    }
  });
});

// Ruta principal redirige al login
app.get('/', (req, res) => {
  res.redirect('/login.html');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;