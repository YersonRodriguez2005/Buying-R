const express = require("express");
const router = express.Router();

let cart = []; // Simulación de carrito en memoria

// Obtener el carrito actual
router.get("/", (req, res) => {
  const total = cart.reduce((acc, item) => acc + item.total, 0);
  res.json({ cart, total });
});

// Agregar un producto al carrito
router.post("/add", (req, res) => {
  let { id_producto, nombre, precio_unitario, cantidad } = req.body;

  // Validación y normalización de datos
  id_producto = parseInt(id_producto);
  precio_unitario = parseFloat(precio_unitario);
  cantidad = parseInt(cantidad);

  if (isNaN(precio_unitario) || isNaN(cantidad) || isNaN(id_producto)) {
    return res.status(400).json({ error: "Datos inválidos" });
  }

  const total = precio_unitario * cantidad;

  const existingItem = cart.find((item) => item.id_producto === id_producto);
  if (existingItem) {
    existingItem.cantidad += cantidad;
    existingItem.total += total;
  } else {
    cart.push({ id_producto, nombre, precio_unitario, cantidad, total });
  }

  res.json({ message: "Producto agregado al carrito", cart });
});

// Eliminar un producto del carrito
router.delete("/remove/:id", (req, res) => {
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  cart = cart.filter((item) => item.id_producto !== id);
  res.json({ message: "Producto eliminado del carrito", cart });
});

// Vaciar el carrito
router.delete("/clear", (req, res) => {
  cart = [];
  res.json({ message: "Carrito vacío", cart });
});

module.exports = router;
