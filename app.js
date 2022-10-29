const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path')
const db = require('./config/db');
const pug = require('pug');

const app = express();

//Pug middleware
app.set('view engine', 'pug')

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', (req, res, next) => {
    res.render('index', {title: "Photo Caption Contest", message: "This is a Photo Caption Contest website. Provide the best photo caption to win!"})
    
});

app.get('/login', (req, res, next) => {
    res.render('login', {title: "Photo Caption Contest", message: "Photo Caption Contest."})
    next();
})



app.use('/users', require('./routes/users'))
const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('listening on port ' + PORT));