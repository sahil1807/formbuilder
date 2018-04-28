var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema(
    {
        uid: String,
        name: String,
        email: String,
        phone:Number,
        username: {
            type: String,
            unique: true
        },
        forms: [],
        aboutMe: String,
        college: String,
        firstName: String,
        lastName: String,
        addressLine1: String,
        addressLine2: String

    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', User);