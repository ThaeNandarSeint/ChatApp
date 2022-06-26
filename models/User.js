const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAvatarImageSet: {
        type: Boolean,
        default: false
    },
    avatarImage: {
        type: String,
        default: ''
    }
})

module.exports = mongoose.model('Users', userSchema)