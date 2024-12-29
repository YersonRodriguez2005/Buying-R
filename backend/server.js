const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const productRoutes = require('./routes/productos');
const cartRoutes = require('./routes/cart');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Rutas
app.use('/productos', productRoutes);
app.use('/cart', cartRoutes);

// Ruta principal
app.get('/', (req, res) => {
  res.send('Servidor Backend funcionando correctamente');
});

// Iniciar servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
