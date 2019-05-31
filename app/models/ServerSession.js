var mongoose = require('mongoose');
var serverSessionSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    ip: {
        type: String,
        required: true,
        unique: false,
    },
    name: {
        type: String,
        required: false,
        default: "test",
        unique: false,
    },
    UDPport: {
        type: Number,
        required: false,
        default: 80
    },
    TCPport: {
        type: Number,
        required: false,
        default: 80
    },
    maxPlayers: {
        type: Number,
        required: false,
        default: 2
    },
    id: {
        type: Number,
        required: true,
        unique: true
    }
});
const serverSession = mongoose.model('serverSession', serverSessionSchema);
module.exports = serverSession;