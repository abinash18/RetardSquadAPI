var mongoose = require('mongoose');
var TradeMarkSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: String,
        required: true
    },
    profileid: {
        type: String
    },
    Skin: {
        type: String,
        required: true
    },
    Cape: {
        type: String,
        required: false
    },
    BackBling: {
        type: String,
        required: false
    },
    PickAxe: {
        type: String,
        required: false
    }
});
const TradeMark = mongoose.model('TradeMark', TradeMarkSchema);
module.exports = TradeMark;