const router = require('express').Router();
let Expense = require('../models/expense.model');

// in expense there is find one that matches all and display
// only from the username
router.route('/find').get((req,res) => {    
    const { query: { username } } = req;
    Expense.find({ username })
    .then(expense => {
        return res.json(expense)
        })
    .catch(err => res.status(400).json('errorGETEXPENSE' + err))
})
router.route('/').get((req,res) => {    
    Expense.find({ "username" : req.query.username})
    .then(expense => {return res.json(expense)})
    .catch(err => res.status(400).json('errorGETEXPENSE' + err))
})

// adding
router.route('/add').post((req,res) => {
    const { body: {username, expensename, expenseamount, expensecategory, expensedate} } = req;
    const newExpense = new Expense({
        username, 
        expensename, 
        expenseamount, 
        expensecategory, 
        expensedate
    });
    newExpense.save()
    .then(expense => {res.json(expense), 'expense added'})
    .catch(err => res.status(400).json('errorPOST' + err))
})

// update by one 
router.route('/:id').get((req,res) => {
    Expense.findById(req.params.id)
    .then(expense => res.json(expense))
        .catch(err => res.status(400).json('errorGETIT' + err))
})

router.route('/:id').delete((req,res) => {
    Expense.findByIdAndDelete(req.params.id)
    .then(expense => res.json(expense))
    .catch(err => res.status(400).json('errorDELETE' + err))
});

router.route('/update/:id').post((req, res) => {
    console.log(req.params.id)
    Expense.findById(req.params.id)
        .then(expense => {
            expense.username = String(req.body.username);
            expense.expensename = String(req.body.expensename);
            expense.expenseamount = Number(req.body.expenseamount);
            expense.expensecategory = String(req.body.expensecategory);
            expense.expensedate = String(req.body.expensedate);
            
            expense.save()
                .then((item) => { return res.json(item);})
                .catch(err => res.status(400).json('Errorsave: ' + err));
        })
        .catch(err => res.status(400).json('Errorcatch: ' + err));
});

module.exports = router;