const express = require('express');
const passport = require('passport');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const db = require('./config/db');
const pug = require('pug');
const { Sequelize, DataTypes } = require('sequelize');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { body, validationResult } = require('express-validator');
const methodOverride = require('method-override');
const cache = require( './routeCache' );
const helmet = require('helmet');







const sequelize = new Sequelize('Photo_Caption', 'andrewpenny', '123456', {
    host: 'localhost',
    dialect: 'postgres',
    storage: './session.postgres'
  });

const app = express();
app.disable('view cache');
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(helmet());

const initializePassport = require('./passport-config');
initializePassport(passport);

//Pug setup
app.set('view engine', 'pug')



// Global middleware
app.use(cookieParser());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//session middleware
app.set("trust proxy", 1);

const myStore = new SequelizeStore({
    db: sequelize
  });
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: myStore,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24,
    } 
  }));
  myStore.sync();
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(flash());
//Routes
app.get('/', cache(300), (req, res, next) => {
    res.render('index', {title: "Photo Caption Contest", message: "This is a Photo Caption Contest website. Provide the best photo caption to win!"})
    
});

app.get('/login', checkNotAuthenticated, (req, res, next) => {
    res.render('login', {title: "Photo Caption Contest", message: "Photo Caption Contest."})
    next();
})

app.post('/login', body('email').isEmail().normalizeEmail(),
body('password').isLength({ min: 5, max: 15 }).trim().escape(), passport.authenticate('local', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}))

app.delete('/logout', (req, res) => {
  req.logout(function(err) {
    if (err) { return next(err); };})
  res.redirect('/login');
})

function checkNotAuthenticated (req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/profile')
  }
  next();
}
app.use('/users', require('./routes/users'));
app.use('/profile', require('./routes/profile'));



const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log('listening on port ' + PORT));