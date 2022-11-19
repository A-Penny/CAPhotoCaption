const express = require('express');
const app = express();
const router = express.Router();
const db = require('../config/db');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');


router.get('/register', checkNotAuthenticated, (req, res, next) => {
    res.render('register', {title: "Photo Caption Contest", message: "Register as a new user."})
    next();
})

// Get all users
router.get('/', (req, res, next) => {
    console.log('Create User');
    User.findAll()
        .then(users => {
            console.log(users);
            res.status(200).send(users)
        })
        .catch(err => console.log(err))
});

//Add a user

router.post('/register', 
    body('email').isEmail().normalizeEmail(), 
    body('password').isLength({ min: 5, max: 15 }).trim().escape(),
    async (req, res, next) => {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        
        return res.status(400).render('register', { errorMessage: errors.errors[0].msg + ': ' + errors.errors[0].param })
      }

    const { first_name, last_name, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    User.create({
        first_name,
        last_name,
        email,
        password: hashedPassword
    })
    .then(user => res.redirect('/login'))
    .catch(err => {
        console.log(err)
        res.send('Cannot create user: ' + err.message)
    })
    
})
    
function checkNotAuthenticated (req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect('/profile')
    }
    next();
  }

/*
router.get('/add', (req, res, next) => {
    

    console.log('just before the user.create...')

    //insert into table
    User.create({
        first_name,
        last_name,
        email,
        password
    })
    .then(user => res.redirect('/users'))
    .catch(err => {
        console.log(err)
        res.send('Cannot create user: ' + err.message)
    })
})
*/
module.exports = router