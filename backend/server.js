const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/acertijos', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.once('open', () => {
  console.log('MongoDB database connection established successfully');
});

const userSchema = new mongoose.Schema({
  name: String,
  time: Number,
});

const User = mongoose.model('User', userSchema);

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

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

app.get('/top-scores', async (req, res) => {
    try {
      const topScores = await User.find().sort({ time: 1 }).limit(10);
      res.json(topScores);
    } catch (error) {
      res.status(400).json('Error: ' + error);
    }
  });
  