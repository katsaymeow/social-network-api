const { Schema, model } = require('mongoose');
// require for the 
const validatorPackage = require('validator');
const Thought = require('./Thought');
// User Model
const userSchema = new Schema(
    {
        username: {
            type: String,
            uniqueItems: true,
            required: [true, "Please enter a valid user name."],
            trimmed: true,
        },
        email: {
            type: String,
            required: [true, "Please enter a valid email"],
            uniqueItems: true,
            validate: {
                validator: validatorPackage.isEmail,
                message: "Please use a valid email",
            },
        },
        thoughts: {
            thought_id: [Thought],
        },
        friends: {
            friends_id: [User],
        },
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

// virtual function for getting friend count
userSchema
    .virtual('friendCount')
    .get(function () {
        return this.friends.length;
    });
// The model of User
const User = model('user', userSchema);

module.exports = User;
