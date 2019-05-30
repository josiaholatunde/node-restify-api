const mongoose = require('mongoose');
const timeStamp = require('mongoose-timestamp');

const Schema = mongoose.Schema;

const CustomerSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    balance: {
        type: String,
        default: 0   
    }
});

mongoose.plugin(timeStamp);

module.exports = mongoose.model('Customer', CustomerSchema);

