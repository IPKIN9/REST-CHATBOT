const mongoose = require('mongoose');

const multipleResSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    content:{type: String, required:true}
});

module.exports = mongoose.model('multiple_res', multipleResSchema);