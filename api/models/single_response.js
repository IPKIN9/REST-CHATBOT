const mongoose = require('mongoose');

const singleResSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content:{type: String, required:true},
    continueContent: {type: mongoose.Schema.Types.ObjectId, ref:'routing', default:null}
});

module.exports = mongoose.model('single_res', singleResSchema);