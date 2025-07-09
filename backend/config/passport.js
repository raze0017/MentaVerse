const bcrypt = require("bcrypt");
const pool = require("../db/pool");
const { Strategy, ExtractJwt } = require("passport-jwt");
const passport = require("passport");

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new Strategy(opts, async (jwt_payload, done) => {
    try {
      const result = await pool.query("select * from users where id=$1", [
        jwt_payload.id,
      ]);
      if (result.rows.length > 0) {
        return done(null, result.rows[0]);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  })
);
