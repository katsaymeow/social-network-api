const { Thought, User } = require('../models');

module.exports = {
    getThoughts(req, res) {
        Thought.find()
            .then((thoughts) => res.json(thoughts))
            .catch((err) => res.status(500).json(err));
    }, 
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
            .then((thoughts) =>
            !thoughts
            ? res.status(404).json({ message: ' No thought with that Id' })
            : res.json(thoughts)
        )
        .catch((err) => res.status(500).json(err));
    },
    createThought(req, res ) {
        Thought.create(req.body)
            .then((thoughts))
    }
}