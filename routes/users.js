const express = require('express');
const router = express.Router();
const db = require('../config/db');
const User = require('../models/User');

/*app.get('/register', (req, res, next) => {
    res.render('register', {title: "Photo Caption Contest", message: "Register as a new user."})
    next();
})*/

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
/*
router.get('/add', (req, res, next) => {
    const data = {
        first_name: "Mary", 
        last_name: "Swanson",
        email: 'samsonite@example.com',
        password: 'password'
    }
    let { first_name, last_name, email, password } = data;

    console.log('just before the user.create...')

    //insert into table
    User.create({
        first_name,
        last_name,
        email,
        password
    })
    .then(user => res.redirect('/users'))
    .catch(err => console.log(err))
})
*/

module.exports = router