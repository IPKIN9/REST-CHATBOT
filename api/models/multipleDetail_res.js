const mongoose = require('mongoose');

const multipleDetailResSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    multipleRes: {type: mongoose.Schema.Types.ObjectId, ref:'multiple_res'},
    content:{type: String, required:true},
    continueContent: {type: mongoose.Schema.Types.ObjectId, ref:'routing', default:null}
});

module.exports = mongoose.model('multipleDetail_res', multipleDetailResSchema);