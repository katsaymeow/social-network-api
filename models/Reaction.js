const { Schema, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reactionSchema = new Schema(
  {
    reactionId: {type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId()},
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        date: { type: Date, default: Date.now },
        get: date => dateFormat(date),
    }
  },
  {
    toJSON: {
        getters: true,
    }
  }
);

// We only need to make the schema for this one

module.exports = reactionSchema;
