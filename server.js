require('dotenv').config();
const bodyParser = require('body-parser');
const express = require("express");
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;

const app = express();
const cors = require('cors');

const homepage = require('./routes/home');
const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const usersRoutes = require('./routes/users');
const registrationsRoutes = require('./routes/registrations');
const reviewsRoutes = require('./routes/reviews');

const { swaggerUi, swaggerSpec } = require("./swagger");


const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);
app.use(bodyParser.json());
app.use(cors({
  origin: ['http://nexushub-event.onrender.com', 'http://localhost:3000'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}));


app.use(
  session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
  secure: true,
  sameSite: 'lax',
  maxAge: 24 * 60 * 60 * 1000 // 1 day
  }
  })
  );

 app.use(passport.initialize());
 app.use(passport.session());


  passport.use(
  new GithubStrategy(
  {
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL:
  process.env.GITHUB_CALLBACK_URL ||
  'http://localhost:3000/auth/github/callback',
  proxy: true
  },
  (accessToken, refreshToken, profile, done) => {
  return done(null, profile);
  }
  )
  );

passport.serializeUser((user, done) => {
done(null, user);
});

passport.deserializeUser((user, done) => {
done(null, user);
});



app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/', homepage);
app.use('/', authRoutes);
app.use('/events', eventsRoutes);
app.use('/users', usersRoutes);
app.use('/registrations', registrationsRoutes);
app.use('/reviews', reviewsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});