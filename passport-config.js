const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./models/User');

function initialize(passport, getUserById) {
    const authenticateUser = async (email, password, done) => {
        const user = await User.findOne({where: { email: email}})
        if (user === null) {
            return done(null, false, { message: 'No user with that email'})
        } 
        try {
            if(await bcrypt.compare(password, user.dataValues.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'password is incorrect'})
            }
        } catch (err) {
            return done(err)
        }
    }
    passport.use(new LocalStrategy({
        usernameField: 'email'
    },
    authenticateUser));
    passport.serializeUser((user, done) => {
        console.log(user.dataValues.id + ' this is the serialize part');
        done(null, user.dataValues.id)})
    

    passport.deserializeUser( async (id, done) => {
        const user = await User.findOne({where: { id }})
        console.log(user + ' at the deserialize function')
        return done(null, user)
    })
}
    
    

module.exports = initialize