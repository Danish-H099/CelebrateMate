const mongoose = require('mongoose');
const { Schema } = mongoose;

const ContactSchema = new Schema({
    // Foreign Key Reference
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users', // Ensure this matches the model name for users
        required: true
    },
    name: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    }
});

const Contacts = mongoose.model('contacts', ContactSchema);
module.exports = Contacts;
