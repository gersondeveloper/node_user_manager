var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: {
        type: String,
        requires: true
    },
    image: {
        type: String,
        required: true,
        default: 'assets/img/no-image.jpg'
    },
    username: {
        type: String,
        required: true,
        trim: true,
        index:{
            unique: true
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
    admin: {
        type: String,
        required: true,
        default: false
    }
});

var user = mongoose.model('user', userSchema);

module.exports = {
    User: user
};