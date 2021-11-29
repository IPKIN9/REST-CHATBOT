const mongoose = require('mongoose');

const routingSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    from: {type:String, required:true},
    to: {type:String, required:true},
    contentType:{type: String, required:true}
});

module.exports = mongoose.model('routing_res', routingSchema);