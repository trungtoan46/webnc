    const mongoose = require('mongoose');
    const AutoIncrement = require('mongoose-sequence')(mongoose);



    const CategorySchema = new mongoose.Schema({
        name: {
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

    const Product = mongoose.model('Product', ProductSchema);
    const Category = mongoose.model('Category', CategorySchema);

    // const createCategory = async () => {
    //     const category = new Category({
    //     name: 'Mèo kiểng',
    //     });
    //     await category.save();
    //     console.log('Category đã được thêm vào database');
    // };
    
   
    // createCategory();
    // const addProduct = async () => {
    //     const product = new Product({
    //         name: "Husky Alaska",
    //         price: 12000000,
    //         description: "Chó Husky dễ thương, 3 tháng tuổi",
    //         image_url: "https://example.com/husky.jpg",
    //         category_id: "67bc119f5c629a61e416be4f",  
    //     });
    //     await product.save();
    //     console.log('✅ Product đã được thêm:');
    // };

    // addProduct();
    
  
    module.exports = { Category, Product };
