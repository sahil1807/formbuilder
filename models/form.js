var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var form = new Schema(
    {
        formNumber: String,
        name: String,
        description: String,
        time: String,
        elements:[],
        createdBy:{
            uid: String,
            name: String,
            url: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Form', form);