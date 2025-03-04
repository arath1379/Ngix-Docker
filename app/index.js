const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar conexión a MySQL
const db = mysql.createConnection({
    host: 'localhost',  // Asegúrate de que 'localhost' es correcto en Docker
    user: 'root',
    password: 'root',
    database: 'mi_base_de_datos'
});

console.log("Intentando conectar a la base de datos...");

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        console.error('Error de conexión:', err);
    } else {
        console.log('Conectado a la base de datos.');
    }
});

// 🔹 Hacer pública la carpeta 'nginx'
app.use(express.static(path.join(__dirname, 'nginx')));

// 🔹 Servir index.html correctamente
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'nginx', 'index.html'));
});

// 🔹 Nueva ruta para obtener datos desde MySQL
app.get('/datos', (req, res) => {
    db.query('SELECT id, nombre, email FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error en la consulta:', err);
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results);
    });
});

// 🔹 Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
