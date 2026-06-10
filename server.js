require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const connectDB = require('./config/db');
const { swaggerUi, swaggerSpec } = require('./swagger');

const authRoutes = require('./routes/auth');
const eventsRoutes = require('./routes/events');
const usersRoutes = require('./routes/users');
const registrationsRoutes = require('./routes/registrations');
const reviewsRoutes = require('./routes/reviews');

const { isAuthenticated } = require('./middleware/requireAuth');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('trust proxy', 1);

app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      'https://nexushub-event.onrender.com',
      'http://localhost:3000'
    ],
    credentials: true
  })
);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 1000 * 60 * 60
    }
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/ui', express.static(path.join(__dirname, 'public')));

app.use('/', authRoutes);
app.use('/events', isAuthenticated, eventsRoutes);
app.use('/users', isAuthenticated, usersRoutes);
app.use('/registrations', isAuthenticated, registrationsRoutes);
app.use('/reviews', isAuthenticated, reviewsRoutes);

app.get('/', (req, res) => {
  if (req.isAuthenticated()) {
    return res.send(`Welcome ${req.user.username || 'user'}! You are authenticated.`);
  }
  res.send('Welcome! You are not authenticated.');
});

app.get('/debug-auth', (req, res) => {
  res.json({
    authenticated: req.isAuthenticated(),
    user: req.user || null,
    session: req.session
  });
});

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

app.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);

    req.session.destroy(err => {
      if (err) return next(err);

      res.clearCookie('connect.sid');
      res.redirect('/');
    });
  });
});

app.use((req, res) => {
  res.status(404).send('404 Not Found - The requested resource does not exist.');
});

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