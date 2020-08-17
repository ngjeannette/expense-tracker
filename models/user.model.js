const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, trim: true},
    password: { type: String , required: true },
}, {timestamps: true})

const User = mongoose.model('UserExpense', userSchema);
module.exports = User;