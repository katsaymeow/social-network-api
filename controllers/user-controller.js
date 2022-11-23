const { User, Thought } = require('../models');

module.exports = {
    getAllUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId})
            .select('-__v')
            .then((user) => 
            !user 
            ? res.status(404).json({
                message: "there is no user here"
            })
            : res.json(user)
            )
            .catch((err) => res.status(500).json(err));
    },
    createUser(req, res) {
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => res.status(500).json(err));
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            {_id: req.params.userId},
            {$addToSet: { thought: req.body } },
            {runValidators: true, new: true}
        )
        .then((user) =>
        !user
        ? res
            .status(404)
            .json({ message: 'There is not a user by that Id' })
            : res.json(user)
            )
        .catch((err) => res.status(500).json(err));
    },
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
            .then((user) =>
            !user
            ? res.status(404).json({
                message: 'This is not a user'
            })
            : Thought.deleteMany(
                { _id: { $in: user.thought } }
            )
        )
        .then((thought) => 
        !thought
            ? res.status(404).json({
                message: 'The user was deleted, but no thought found',
            })
            : res.json({ message: 'User and thought were deleted successfully'})
            )
        .catch((err) => {
            res.status(500).json(err)
        });
    },
    addFriendToUser( req, res ) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            {$add: req.params.friendsId},
            {runValidators: true, new: true }
        )
         .then((friends) =>
         !friends
            ? res.status(404).json({ message: 'This user has no friends yet!'})
            : res.json(friends)
        )
        .catch((err) => res.status(500).json(err));
    },
    deleteFriendFromUser( req, res ) {
        User.findOneAndDelete(
            { _id: req.params.userId },
            {$remove: req.params.friendsId },
            { runValidators: true, new: true }
        )
        .then((friends) =>
            !friends
                ? res.status(404).json({ message: 'There is not a friend to delete' })
                : res.json(friends)
        )
        .catch((err) => res.status(500).json(err));
    },
};


