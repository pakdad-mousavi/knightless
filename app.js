import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import helpers from './views/helpers.js';
import cookieParser from 'cookie-parser';
import path from 'node:path';
import dotenv from 'dotenv';
import nosqlSanitizer from 'express-nosql-sanitizer';
import passport from 'passport';
import { initializePassport } from './passport-config.js';
import session from 'express-session';

// Import routers
import defaultRouter from './routes/index.js';
import authRouter from './routes/auth.js';

// Configurate dotenv file:
dotenv.config();

// Create app:
const app = express();
const PORT = process.env.PORT || 3000;
const dirname = path.resolve();

// Render static files:
app.use(
  express.static(`${dirname}/assets/`, {
    setHeaders: (res, path) => {
      // Set Cache-Control to no-cache for all static files
      res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    },
  })
);

// Render static chessboardjs and chess.js files from node modules:
app.use('/chessground', express.static(`${dirname}/node_modules/chessground`));

// Render static chesspieces files from images folder:
app.use(
  '/chesspieces',
  express.static(`${dirname}/assets/images/chesspieces`, {
    maxAge: '1d',
  })
);

// Set up the body parser:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sanitize requests:
app.use(nosqlSanitizer());

// Set up the cookie parser:
app.use(cookieParser(process.env.COOKIE_SECRET_KEY));

// Set up view engine:
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index',
    partialsDir: `${dirname}/views/partials`,
    helpers,
  })
);
app.set('view engine', '.hbs');
app.set('views', './views');

// Initialize express session
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: true }));

// Initialize passport
app.use(passport.initialize());
app.use(passport.session());

//  Set up the strategy and serialization/deserialization
initializePassport();

// Set up routes:
app.use('/auth', authRouter);
app.use('/', defaultRouter);

// Connect to database:
(async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_DB_URI}`, { family: 4 });
  } catch (err) {
    console.log(err);
  }
})();

app.listen(PORT, () => {
  console.log(`Listening on http://localhost:${PORT}`);
});
