var roledef = 'Member';
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, 'Username must be grater than 5 characters']
    },
    password: {
        type: String,
        required: true,
        unique: false,
        minlength: [5, 'Username must be grater than 5 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    profileid: {
        type: String,
        required: true,
    },
    roles: {
        type: String,
        default: roledef,
        sparse: true
    },
    profilePic: {
        type: String,
        required: false,
        default: '/default/person.jpg'
    },
    // trademarks: [{
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: 'TradeMark'
    // }],
    admin: {
        type: Boolean,
        required: false,
        default: false
    },
    ign: {
        type: String,
        required: false,
        unique: true
    }
});
const User = mongoose.model('User', UserSchema);
module.exports = User;
// write encryption
