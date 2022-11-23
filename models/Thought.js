const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reaction');
const dateFormat = require('../utils/dateFormat');
const User = require('./User');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: [true, "please enter a thought"],
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date ,
            default: Date.now ,
            get: date => dateFormat(date),
        },
        username: [User],
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

// virtual
thoughtSchema
    .virtual('reactionCount')
    .get(function () {
        return this.reactions.length;
    });

// Model of Thought
const Thought = model('thought', thoughtSchema);

module.exports = Thought;
