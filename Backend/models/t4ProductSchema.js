 
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'categories'
    }
});

module.exports = mongoose.model('product', productSchema);
