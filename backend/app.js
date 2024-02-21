
const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.json());

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'campus2024',
  database: 'market',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

app.post('/crear_producto', async (req, res) => {
  const data = req.body;

  // Validaciones
  if (!data.nombre || data.nombre.length > 60) {
    return res.status(400).json({ error: 'Nombre es requerido y debe tener como máximo 60 caracteres' });
  }

  if (!data.barcode) {
    return res.status(400).json({ error: 'Barcode es requerido' });
  }

  if (!data.presentacion || data.presentacion.length > 25) {
    return res.status(400).json({ error: 'Presentacion es requerida y debe tener como máximo 25 caracteres' });
  }

  // Conectar a la base de datos
  const connection = await pool.getConnection();

  try {
    // Realizar la inserción
    const [result] = await connection.query(
      'INSERT INTO PRODUCTOS (nombre, barcode, presentacion) VALUES (?, ?, ?)',
      [data.nombre, data.barcode, data.presentacion]
    );

    // Enviar respuesta
    res.status(201).json({ mensaje: 'Producto creado exitosamente' });
  } catch (error) {
    console.error('Error al crear el producto:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
    // Liberar la conexión
    connection.release();
  }
});




// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});