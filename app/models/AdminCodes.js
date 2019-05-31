var mongoose = require('mongoose');
var AdminSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    code: {
        type: String,
        required: true,
        unique: true,
    },
    issuedTo: {
        type: String,
        required: false
    },
    avalible: {
        type: Boolean,
        required: false,
        default: true
    }
});
const AdminCodes = mongoose.model('AdminCodes', AdminSchema);
module.exports = AdminCodes;