const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const router = express.Router();
const db = require('../config/db');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');

const initializePassport = require('../passport-config');
initializePassport(
    passport, 
    (email) => { return User.findOne({ where: { email } })
});

router.get('/', (req, res, next) => {
    res.render('login', {title: "Photo Caption Contest", message: "Photo Caption Contest."})
    next();
})

router.post('/', body('email').isEmail().normalizeEmail(),
body('password').isLength({ min: 5, max: 15 }).trim().escape(),
async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        
        return res.status(400).render('login', { errorMessage: 'Invalid login credentials, please try again...'})
      }

    const { email, password } = req.body;
    try {
        const user = await User.findOne({where: {email: email}});
        console.log(user)
        if (user === null) {
           return res.render('login', { errorMessage: 'No user by that email was found'} )
        }
        const hashedpass = user.dataValues.password
    const matchedPassword = await bcrypt.compare(password, hashedpass, );
    console.log(matchedPassword);
    if (!matchedPassword) {
        console.log('passwords do not match')
        return res.render('login', {errorMessage: 'Passwords did not match'})
    }
    const username = user.dataValues.first_name
    console.log('passwords DO match...');
    req.session.authenticated = true;
      // Add the user object below:
      req.session.user = {
        username,
        hashedpass
      }
      console.log(req.session)
    res.render('profile', { user: username});
    } catch (e) {
        res.send(e)
    }
})
module.exports = router;