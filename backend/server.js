const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
const mongoURI = 'mongodb://root:tu_contraseña_segura@127.0.0.1:27017/mean-tech-store?authSource=admin';

mongoose.connect(mongoURI)
  .then(() => console.log('✅ Conectado a MongoDB (Container)'))
  .catch(err => console.error('❌ Error conectando a MongoDB:', err));

// Rutas
const productRoutes = require('./routes/products');
app.use('/api/products', productRoutes);

app.get('/', (req, res) => {
  res.send('API REST funcionando OK (MongoDB)');
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
