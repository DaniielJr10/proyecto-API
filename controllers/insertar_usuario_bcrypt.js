const mysql = require('mysql2');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // Prueba sin contraseña primero
    database: 'tienda'
});

connection.connect(async (err) => {
    if (err) {
        return console.error('Error de conexión:', err.message);
    }
    
    console.log('Conectado a la base de datos');
    
    const username = 'user';
    const plainPassword = 'user123';
    
    try {
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        const sql = 'INSERT INTO usuarios (username, password) VALUES (?, ?) ON DUPLICATE KEY UPDATE password = ?';
        const values = [username, hashedPassword, hashedPassword];
        
        connection.query(sql, values, (err, results) => {
            if (err) {
                console.error('Error al insertar usuario:', err.message);
            } else {
                console.log('Usuario insertado/actualizado correctamente');
              
            }
            
            connection.end();
        });
        
    } catch (error) {
        console.error('Error al hashear contraseña:', error.message);
        connection.end();
    }
});
