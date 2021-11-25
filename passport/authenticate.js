import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';

// JWT strategy for handling bearer token
passport.use(new BearerStrategy(
  (token, done) => {
    try {
      let authenticated = false;

      if (token === process.env.TOKEN) authenticated = true;

      if (authenticated) {
        return done(null, authenticated);
      } else {
        return done(null, false);
      }
    } catch (e) {
      return done(null, false);
    }
  },
));

export default (req, res, next) => {
  passport.authenticate('bearer', { session: false }, (error, client) => {
    if (!error && client) {
      next(false);
    } else {
      res.sendStatus(401);
    }
  })(req, res, next);
};
