var mongoose = require('mongoose');
var pathSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    route: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    admin: {
        type: Boolean,
        required: false,
        default: false
    },
    dev: {
        type: Boolean,
        required: false,
        default: false
    }
});
const pathRoutes = mongoose.model('pathRoutes', pathSchema);
module.exports = pathRoutes;