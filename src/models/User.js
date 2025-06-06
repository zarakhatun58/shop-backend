const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  password: {
    type: String,
    required: true,
  },
  shops:{
    type:[String],
    validate:[arr=>arr.length >= 3, 'At least shops required']
  },
   shopSlugs: {
    type: [String],
    validate: [arr => arr.length >= 3, 'At least 3 shop slugs required']
  }
   
});

module.exports = mongoose.model('ShopUser', userSchema, 'shopUser');
