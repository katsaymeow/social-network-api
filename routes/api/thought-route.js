const router = require('express').Router();
const {
   getThoughts,
   getSingleThought,
   createThought,
   deleteThought,
   thoughtReaction,
   removeReaction
   
} = require('../../controllers/thought-controller');
// api/thoughts
router
   .route('/')
   .get(getThoughts)
   .get(getSingleThought)
   .post(createThought)
   .delete(deleteThought)
// api/thoughts/:thoughtId/reactions
router
   .route('/:thoughtId/reactions')
   .post(thoughtReaction)
   .delete(removeReaction);
// Use exported functions from line 3 to create routes

module.exports = router;
