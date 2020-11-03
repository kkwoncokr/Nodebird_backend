const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = () => {
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField:'password',
        session: true,
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({
                where : { email }
            });
            if (!user) {
                return done(null, false, {reason: '존재하지 않는 이메일 입니다!'});
            }
            const result = await bcrypt.compare(password, user.password);
            if(result) {
                return done(null, user)
            }
            return done(null, false, {reason : '패스워드가 일치하지 않습니다.'})
        } catch(error) {
            console.debug(error);
            return done(error)
        }
    }));
}