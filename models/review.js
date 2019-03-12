const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  shop: {
    type : mongoose.Schema.Types.ObjectId, 
    ref : 'Shop', required: true  
  },
  user: {
    type : mongoose.Schema.Types.ObjectId, 
    ref : 'User', required: true  
  },
  like: { type: Boolean, required: true },
  dislike: { type: Boolean, required: true },
  timeDislike: { type: Date, required: true } 
});

module.exports = mongoose.model('Review', reviewSchema);