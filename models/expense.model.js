const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const expenseSchema = new Schema({
    username: { type: String, required: true },
    expensename: { type: String, required: true },
    expenseamount: { type: Number, required: true },
    expensecategory: { type: String, required: true },
    expensedate: { type: String, required: true }
}, {
    timestamps: true,
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;