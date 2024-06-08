/**
 * Servidor backend para el juego de acertijos matemáticos.
 * 
 * Este servidor maneja las solicitudes para agregar nuevos ganadores y obtener los
 * 10 mejores puntajes. Utiliza Express para crear el servidor, Mongoose para conectar
 * y manejar la base de datos MongoDB, y CORS para permitir solicitudes desde otros
 * dominios.
 * 
 * - Ruta POST `/winner`: Agrega un nuevo ganador a la base de datos.
 * - Ruta GET `/top-scores`: Obtiene los 10 mejores puntajes de la base de datos.
 */

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware para permitir solicitudes desde cualquier origen
app.use(cors());
// Middleware para parsear cuerpos de solicitudes en formato JSON
app.use(express.json());

// Conexión a la base de datos MongoDB
mongoose.connect('mongodb://localhost:27017/acertijos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
// Mensaje cuando la conexión a la base de datos se establece exitosamente
db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

// Definición del esquema para los usuarios
const userSchema = new mongoose.Schema({
  name: String,
  time: Number,
});

// Modelo de usuario basado en el esquema
const User = mongoose.model('User', userSchema);

// Ruta para agregar un nuevo ganador
app.post('/winner', async (req, res) => {
  const { name, time } = req.body;
  const newUser = new User({ name, time });
  try {
    await newUser.save();
    res.status(201).json('User added!');
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// Ruta para obtener los 10 mejores puntajes
app.get('/top-scores', async (req, res) => {
  try {
    const topScores = await User.find().sort({ time: 1 }).limit(10);
    res.json(topScores);
  } catch (error) {
    res.status(400).json('Error: ' + error);
  }
});

// Inicia el servidor en el puerto especificado
app.listen(port, '0.0.0.0', () => {
  console.log(`Server is running on port: ${port}`);
});
