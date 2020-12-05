const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
    name:  {type: String, required: true},
    category_name:{type: String, required: true},
    max_client:  {type: Number, required: true},
    duration: {type: Number, required: true},
    owner: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
  });


module.exports = mongoose.model('Room',roomSchema);
