const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// Category Schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    rate: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('Category', CategorySchema);