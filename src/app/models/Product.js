const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-generator');
const bcrypt = require('bcrypt-nodejs');
mongoose.plugin(slug);

const Product = new mongoose.Schema({
    name: { type: String, require: true },
    image: { type: String },
    price: { type: String },
    slug: {type: String, slug : 'name'},
}, { 
    timestamps: true,
});

module.exports = mongoose.model('Product', Product);
