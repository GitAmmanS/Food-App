const Product = require('../models/t4ProductSchema');
const mongoose = require('mongoose');
exports.createProduct = async (req, res) => {
    try {
        const { name, description, price, category } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const { productId, categoryId } = req.query;

        // Initialize the query object
        let query = {};

        // Add conditions to the query object based on the provided parameters
        if (productId && mongoose.Types.ObjectId.isValid(productId)) {
            query._id = productId;
        }
        if (categoryId && mongoose.Types.ObjectId.isValid(categoryId)) {
            query.category = categoryId;
        }

        // Find books that match any of the provided criteria
        const products = await Product.find(query).populate('category');

        if (!products || products.length === 0) {
            return res.status(404).json({ error: 'No products found' });
        }

        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.getProduct1 = async (req, res) => {
    try {
        const products = await Product.find().populate('category'); 
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};

exports.searchProductByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Title query parameter is required' });
        }

        const products = await Product.find({ name: { $regex: name, $options: 'i' } }).populate('category');
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
exports.deleteProductByName = async (req, res) => {
    try {
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({ error: 'Title query parameter is required' });
        }

        const products = await Product.deleteOne({ name});
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
};
