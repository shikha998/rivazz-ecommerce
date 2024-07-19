const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brandName: { type: String, required: true },
    productImages: [{ type: String }], // Array of image URLs
    description: { type: String, required: true },
    price: { type: Number, required: true },
    sellingPrice: { type: Number },
}, {
    timestamps: true
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
