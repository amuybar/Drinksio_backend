const express = require('express');
const mongoose = require('mongoose');
const beerRoutes = require('./routes/beerRoutes');

const app = express();

mongoose.connect('mongodb+srv://BeerDb:V7swfW3LC.9cBjy@cluster0.0gcxai4.mongodb.net/BeerDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err.message);
  });

app.use(express.json());
app.use(beerRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});