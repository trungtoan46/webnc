const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// Product Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
        default: 'https://placehold.co/600x400/EEE/31343C',
    },
    size: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    tags: {
        type: String,
        required: true,
    },
    images: {
        type: Array,
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
    category_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    
});
ProductSchema.plugin(AutoIncrement, { inc_field: 'product_id' });

module.exports = mongoose.model('Product', ProductSchema);