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
            .then((thoughts) =>
            {
                return User.findOneandUpdate(
                    {_id: req.body.userId},
                    { $addToSet: { thoughtText: thoughts._id}},
                    {new: true}
                );
            })
        .then((user) => 
          !user
            ? res.status(404).json ({
                message: 'I am sorry, that user does not exsist',
            })
            : res.json('Thought created')
            )
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    },
    deleteThought(req, res) {
        Thought.findOneAndRemove({
            _id: req.params.thoughtId
        })
        .then((thought) =>
        !thought ? res.status(404).json({ message: 'There is not at thought with this ID'})
        : User.findOneAndUpdate(
            {
                thoughts: req.params.thoughtId
            },
            {
                $pull: {
                    thoughts: req.params.thoughtId
                }
            },
            {
                new: true
            }
        )
    )
    .then((user) => 
    !user
     ? res.status(404).json({
        message: 'There is no user for this thought'
     })
     : res.json({
        message: 'Thought was deleted'})
     )
     .catch((err) => res.status(500).json(err));
    },
    thoughtReaction(req, res) {
            Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $addToSet: {
                        reaction: req.body
                    }
                },
                { runValidators: true, new: true }
            )
            .then((thoughts) =>
            !thoughts
            ? res.status(404).json({
                message: 'There is no thought with this Id'
            })
            : res.json(thoughts)
            )
            .catch((err) => res.status(500).json(err));
    },
    removeReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reaction: { reactionId: req.params.reactionId }}},
            { runValidators: true, new: true }
        )
         .then((thought) => 
         !thought
          ? res.status(404).json({ message: 'No reaction with this Id'})
          : res.json(thoughts)
          )
          .catch((err) => res.status(500).json(err));
    }, 
};