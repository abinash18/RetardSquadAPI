var mongoose = require('mongoose');
var SkinSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imagePreview: {
        type: String,
        required: false,
        default: '/FSTM/Skins/fulldefault.jpg'
    },
    rarity: {
        type: Number,
        required: false,
        default: 1
    },
    skinSeason: {
        type: Number,
        required: false,
        default: 6
    },
    skinPreview: {
        type: String,
        required: false,
        default: '/FSTM/Skins/default.jpeg'
    },
    tier: {
        type: Number,
        required: false,
        default: 1
    },
    challenges: {
        type: Number,
        required: false,
        default: '0'
    },
    name: {
        type: String,
        required: true
    },
    trademarked: {
        type: Boolean,
        required: true,
        default: false
    },
    tradeMarkedBy: {
        type: String,
        required: false,
        unique: true
    }
});
const Skins = mongoose.model('Skins', SkinSchema);
module.exports = Skins;