const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please tell us your name']
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password not correct']
    }
})

module.exports = mongoose.model('User', userSchema);  //User will be the name of collection on database. and on DB the name will be added with s, so becomse Users