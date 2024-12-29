const express = require('express');
const router = express.Router();
const db = require('../db/db');

// Obtener todos los productos
router.get('/', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query)
    .then(([results]) => res.json(results))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Registrar un nuevo producto
router.post('/', (req, res) => {
  const { nombre, precio_unitario, cantidad_disponible } = req.body;
  const query = 'INSERT INTO productos (nombre, precio_unitario, cantidad_disponible) VALUES (?, ?, ?)';
  db.query(query, [nombre, precio_unitario, cantidad_disponible])
    .then(([results]) => res.status(201).json({ message: 'Producto registrado con éxito', id: results.insertId }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Editar un producto existente
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nombre, precio_unitario, cantidad_disponible } = req.body;
  const query = 'UPDATE productos SET nombre = ?, precio_unitario = ?, cantidad_disponible = ? WHERE id_producto = ?';
  db.query(query, [nombre, precio_unitario, cantidad_disponible, id])
    .then(() => res.json({ message: 'Producto actualizado con éxito' }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Eliminar un producto
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM productos WHERE id_producto = ?';
  db.query(query, [id])
    .then(() => res.json({ message: 'Producto eliminado con éxito' }))
    .catch((err) => res.status(500).json({ error: err.message }));
});

// Filtrar productos
router.get('/filtrar', (req, res) => {
  const { nombre, precio_min, precio_max, cantidad_min, cantidad_max } = req.query;
  let query = 'SELECT * FROM productos WHERE 1=1';
  const params = [];

  if (nombre) {
    query += ' AND nombre LIKE ?';
    params.push(`%${nombre}%`);
  }
  if (precio_min) {
    query += ' AND precio_unitario >= ?';
    params.push(precio_min);
  }
  if (precio_max) {
    query += ' AND precio_unitario <= ?';
    params.push(precio_max);
  }
  if (cantidad_min) {
    query += ' AND cantidad_disponible >= ?';
    params.push(cantidad_min);
  }
  if (cantidad_max) {
    query += ' AND cantidad_disponible <= ?';
    params.push(cantidad_max);
  }

  db.query(query, params)
    .then(([results]) => res.json(results))
    .catch((err) => res.status(500).json({ error: err.message }));
});

module.exports = router;
