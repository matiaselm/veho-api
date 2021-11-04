import passport from 'passport';
import BearerStrategy from 'passport-http-bearer';

console.log('secret', process.env.JWT_SECRET);
// JWT strategy for handling bearer token
passport.use(new BearerStrategy(
    (token, done) => {
      console.log('token', token);
      try {
        let authenticated = false;

        if(token === process.env.TOKEN) authenticated = true;

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

export default (req, res) => {
  return new Promise((resolve, _) => {
      passport.authenticate('bearer', {session: false}, (error, client) => {
          if (error || !client) {
              resolve(false);
          }
          resolve(client);
      })(req, res);
  });
};