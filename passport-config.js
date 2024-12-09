import passport from 'passport';
import { Strategy } from 'passport-google-oauth20';
import { User } from './models/user.js';

export const initializePassport = () => {
  passport.use(
    new Strategy(
      {
        clientID: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // Optionally save user profile to your database
        const user = await User.findOneAndUpdate(
          { googleId: profile.id }, // Match on Google ID
          { $set: { name: profile.displayName, email: profile.emails[0].value } }, // Only update these fields
          { new: true, upsert: true }
        );

        return done(null, user);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });
};
