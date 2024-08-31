const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: { type: String },
    address: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, required: true, enum: ['super admin', 'manager', 'user', 'admin'] }
});


module.exports = mongoose.model('User', UserSchema);
