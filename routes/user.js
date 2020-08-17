const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req,res)=> {
    const { query: { username } } = req;
    User.findOne({ username })
    .then(user => { return res.json(user)})
    .catch(err => res.status(400).json('errorGET' + err))
})

router.route('/login').get((req, res) => {
    const { query: { username, password } } = req;
    User.findOne({ username, password })
        .then(user => { return res.json(user) })
        .catch(err => res.status(400).json('errorGET' + err))
});

router.route('/checkuser').get((req,res)=> {
    const { query: {username} } = req;
    User.findOne({username})
    .then(user => { return res.json(user) })
    .catch(err => res.status(400).json('errorGET' + err))
})

router.route('/add').post((req,res) => {
    const username = req.body.username;
    const password = req.body.password;
    const newUser = new User({
        username, 
        password
    })
    newUser.save()
    .then(() => res.json('User Added'))
    .catch((err) => res.status(400).json('errorPOST' + err))
})

router.route('/:id').get((req,res) => {
    User.findById(req.params.id)
    .then(user => res.json(user))
    .catch((err) => res.status(400).json('errorGETIT' + err))
})

router.route('/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('errorDELETE' + err))
})

module.exports = router;