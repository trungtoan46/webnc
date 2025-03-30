const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


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

module.exports = mongoose.model('Voucher', VoucherSchema);