const express = require('express');
const router = express.Router();
const Beer = require('../model/Beer');
const { uploadSingleImage }  = require('../midleware/uploadBeerImages');

// Get all beers
router.get('/beers', async (req, res) => {
  try {
    const beers = await Beer.find().populate('image');
    res.json(beers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific beer by ID
router.get('/beers/:id', (req, res) => {
  Beer.findById(req.params.id)
    .then(beer => {
      if (!beer) {
        return res.status(404).send("Beer not found");
      }
      res.json(beer);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Add a new beer
router.post('/beers', uploadSingleImage, async (req, res, next) => { // Ensure this callback function is defined
  try {
    const beerData = req.body;

    // If the image is uploaded, store the image path
    if (req.file) {
      beerData.image = req.file.filename; // Store the original filename (without path)
    } else {
      beerData.image = null; // Set image to null if no image uploaded
    }

    // Save the beer data in the database (without image buffer)
    const beer = new Beer(beerData);
    await beer.save();

    res.status(201).send(beer); // Send the created beer data (without image buffer)
  } catch (error) {
    next(error); // Pass errors to error handler
  }
});


// Edit a specific beer by ID
router.put('/beers/:id', (req, res) => {
  Beer.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(beer => {
      if (!beer) {
        return res.status(404).send("Beer not found");
      }
      res.json(beer);
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

// Delete a specific beer by ID
router.delete('/beers/:id', (req, res) => {
  Beer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Beer deleted successfully");
    })
    .catch(err => {
      res.status(400).json({ error: err.message });
    });
});

// Get beers by brewery
router.get('/beers/brewery/:breweryName', (req, res) => {
  Beer.find({ brewery: req.params.breweryName })
    .then(beers => {
      res.json(beers);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

// Get beers by color and origin
router.get('/beers/color', (req, res) => {
  const { color } = req.query;

  Beer.find({ "color": color })
    .then(beers => {
      res.json(beers);
    })
    .catch(err => {
      res.status(500).json({ error: err.message });
    });
});

module.exports = router;
