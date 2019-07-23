const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const Usuario = mongoose.model("usuarios");
const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, (jwt_payload,done) => {
            Usuario.findById(jwt_payload.id)
              .then(user => {
                  if(user){
                      return done(null,user);
                  }
                  return done(false,null);
              })
              .catch(err=> console.log(err))
        })
    )
}
