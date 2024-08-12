import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import path from 'path';
import dotenv from 'dotenv';
// import mongoose from 'mongoose';

import defaultRouter from './routes/index.js';

// Configurate dotenv file:
dotenv.config();

// Create app:
const app = express();
const PORT = process.env.PORT || 3000;
const dirname = path.resolve();

// Render static files:
app.use(express.static(`${dirname}/assets/`));

// Set up the body parser:
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set up view engine:
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'index',
    partialsDir: `${dirname}/views/partials`,
  })
);
app.set('view engine', '.hbs');
app.set('views', './views');

// Set up routes:
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
