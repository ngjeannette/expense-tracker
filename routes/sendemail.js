const router = require('express').Router();
const User = require('../models/user.model');''

const sendEmail = require('../send');

// check in database if it exists first 
router.route('/send').post((req, res) => {
    const {
        body: {
            username, 
            password
        },
    } = req;

    User.findOne({ username })
        .then(user => {
            const subject = 'Password recovery';
            const body = `Your password is ${user.password}!`;
            sendEmail([user.username], subject, body);
            return res.json('Success');
        })
        .catch(res.json('error'))
})

module.exports = router;