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
        }
    });
    ProductSchema.plugin(AutoIncrement, { inc_field: 'product_id' });




    // Cart Schema
    const CartSchema = new mongoose.Schema({
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        product_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        quantity: { 
            type: Number,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    });
    CartSchema.plugin(AutoIncrement, { inc_field: 'cart_id' });

    // User Schema
    const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: { 
            type: String,
            required: true,
        },
        created_at: {
            type: Date,
            default: Date.now,
        },
    });
    UserSchema.plugin(AutoIncrement, { inc_field: 'user_id' });

    //Voucher Schema
    const VoucherSchema = new mongoose.Schema({
        code: {
            type: String,
            required: true,
        },
        discount: {
            type: Number,
            required: true,
        },  
        created_at: {
            type: Date,
            default: Date.now,
        },
    });
    VoucherSchema.plugin(AutoIncrement, { inc_field: 'voucher_id' });

    const userSchema = new mongoose.Schema({
        username: { type: String, required: true, unique: true },
        password: { type: String, required: true },
    });
    
    const Product = mongoose.model('Product', ProductSchema);
    const Category = mongoose.model('Category', CategorySchema);
    const Cart = mongoose.model('Cart', CartSchema);
    const User = mongoose.model('User', UserSchema);
    const Voucher = mongoose.model('Voucher', VoucherSchema);

    
  
    module.exports = { Category, Product, Cart, User, Voucher };
