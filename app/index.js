const express = require('express');
const mysql = require('mysql2');
const path = require('path');

const app = express();
const PORT = 3000;

// Configurar conexión a MySQL
const db = mysql.createConnection({
    host: 'mysql',  // Nombre del servicio MySQL en Docker
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

// Servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Nueva ruta para obtener datos desde MySQL
app.get('/datos', (req, res) => {
    db.ping((err) => {
        if (err) {
            console.error('Error con la conexión a la BD:', err);
            res.status(500).send('Error de conexión a la base de datos');
            return;
        }

        db.query('SELECT id, nombre, email FROM usuarios', (err, results) => {
            if (err) {
                console.error('Error en la consulta:', err);
                res.status(500).send('Error en la base de datos');
                return;
            }
            res.json(results);
        });
    });
});

// Iniciar servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
