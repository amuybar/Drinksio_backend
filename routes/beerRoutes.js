const express = require('express');
const router = express.Router();
const Beer = require('../model/Beer');

// Get all beers
router.get('/beers', (req, res) => {
  Beer.find()
    .then(beers => {
      res.json(beers);
    })
    .catch(err => {
      res.status(400).send(err);
    });
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
      res.status(400).send(err);
    });
});

// Get beers by brewery
router.get('/beers/brewery/:breweryName', (req, res) => {
  Beer.find({ brewery: req.params.breweryName })
    .then(beers => {
      res.json(beers);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Get beers by color and origin
router.get('/beers/color', (req, res) => {
  const { color } = req.query;

  Beer.find({ "color": color, })
    .then(beers => {
      res.json(beers);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// Add a new beer
router.post('/beers', (req, res) => {
  const newBeer = new Beer(req.body);
  newBeer.save()
    .then(beer => {
      res.json(beer);
    })
    .catch(err => {
      res.status(400).send(err);
    });
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
      res.status(400).send(err);
    });
});

// Delete a specific beer by ID
router.delete('/beers/:id', (req, res) => {
  Beer.findByIdAndDelete(req.params.id)
    .then(() => {
      res.send("Beer deleted successfully");
    })
    .catch(err => {
      res.status(400).send(err);
    });
});
module.exports = router;