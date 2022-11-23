const router = require('express').Router();
const {
   getThoughts,
   getSingleThought,
   createThought,
   
} = require('../../controllers/thought-controller');

// Use exported functions from line 3 to create routes

module.exports = router;
