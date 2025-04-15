const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


const VariantSchema = new mongoose.Schema({
    size: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
      default: 0,
    }
  }, { _id: false });

// Product Schema
const ProductSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    name_slug: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },  
    variants: {
        type: [VariantSchema],
        required: true,
    },

    description: {
        type: String,
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
        default: 'https://placehold.co/600x400/EEE/31343C',
    },

    tags: {
        type: Array,
        required: false,
    },
    sale_price: {
        type: Number,
        default: 0,
        required: false,
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
    detail_images: {
        type: Array,
        default: [],
    },
    event_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: false,
        default: null,
    },
});
ProductSchema.plugin(AutoIncrement, { inc_field: 'product_id' });

module.exports = mongoose.model('Product', ProductSchema);