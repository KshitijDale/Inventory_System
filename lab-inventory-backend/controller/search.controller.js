const express = require("express");
const asynchandler = require("../utils/asynchandler");
const Product = require("../models/Product");
const APIError = require("../utils/APIError");

// Search Products API
exports.getSearch = asynchandler(async (req, res) => {
    const { query } = req.query;

    if (!query) {
        throw new APIError(400, "Search query is required");
    }

    // Case-insensitive search on product name
    const products = await Product.find({
        prd_name: { $regex: `^${query}`, $options: "i" } // Starts with `query`, case-insensitive
    }).limit(10); // Limit results for efficiency

    res.json(products);
});

