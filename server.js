require('dotenv').config();
const bodyParser = require('body-parser');
const express = require("express");
const passport = require('passport');
const session = require('express-session');
const GithubStrategy = require('passport-github2').Strategy;

const app = express();
const cors = require('cors');

const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const usersRoutes = require('./routes/users');
const registrationsRoutes = require('./routes/registrations');
const reviewsRoutes = require('./routes/reviews');
const isAuthenticated = require('./middleware/requireAuth').isAuthenticated;

const { swaggerUi, swaggerSpec } = require("./swagger");


const connectDB = require('./config/db');
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
app.use('/', authRoutes);
app.use('/events', isAuthenticated, eventsRoutes);
app.use('/users',usersRoutes);
app.use('/registrations', isAuthenticated, registrationsRoutes);
app.use('/reviews', isAuthenticated, reviewsRoutes);


// home route
app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
return res.send(`Welcome ${req.user.username}! You are authenticated.`);
  }

  res.send('Welcome! You are not authenticated.');
  });



// callback route for GitHub authentication
app.get(
  '/auth/github/callback',
  passport.authenticate('github', {
  failureRedirect: '/api-docs',
  session: true
  }),
  (req, res) => {
  res.redirect('/');
  }
  );


//  404 handler for unmatched routes
  app.use((req, res) => {
  res.status(404).send('404 Not Found - The requested resource does not exist.');
});

//   Start Server
  async function startServer() {
  try {
  await connectDB();

  app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log('✅ MongoDB connected');
  });
  } catch (error) {
  console.error('❌ Failed to start server:', error.message);
  process.exit(1);
  }
  }

startServer();
