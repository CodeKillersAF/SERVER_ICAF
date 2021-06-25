const User = require('../models/User.model');
const { SECRET } = require('../config');
//extract our request files
const { Strategy, ExtractJwt } = require('passport-jwt');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: SECRET
}

module.exports = (passport) => {
                                           //where we extract the id
    passport.use(new Strategy(options, async(payload, done) => {
        await User.findById(payload.user_id)
        .then(async user => {
            if(user) {
                            //no error
                return done(null, user);
            }
            return done(null, false);
        }).catch((error) => {
            //unauthorized route
            return done(null, false);
        });
      })
    );
};