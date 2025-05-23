const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    is_active: {
        type: Boolean,
        default: true,
    },
    created_at: {
        type: Date,
        default: Date.now,  
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: String,
        required: false,
    },
}); 

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
