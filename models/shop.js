const mongoose = require('mongoose');

const shopSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: { type: String, required: true },
  image: { type: String, required: true },
  lat: {type: Number, require: true},
  lon: {type: Number, require: true}
});

module.exports = mongoose.model('Shop', shopSchema);