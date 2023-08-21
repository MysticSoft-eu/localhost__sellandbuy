const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
   parent: {
    type: String,
    ref: 'Category',
    default: null
  },
  children: [{
    type: String,
    ref: 'Category',
  }],
});

const CategoryModel = mongoose.model('Category',CategorySchema);

module.exports = CategoryModel;
