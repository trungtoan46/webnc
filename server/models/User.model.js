const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);


// User Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
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

module.exports = mongoose.model('User', UserSchema);