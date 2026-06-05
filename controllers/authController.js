const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const authModel = require('../models/authModel');

const githubClientID = process.env.GITHUB_CLIENT_ID;
const githubClientSecret = process.env.GITHUB_CLIENT_SECRET;
const callbackBase = process.env.GITHUB_CALLBACK_URL || 'http://localhost:3000';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = authModel.getUserById(id);
  done(null, user || null);
});

function buildOAuthUser(provider, profile) {
  const providerId = profile.id;
  const displayName = profile.displayName || profile.username || '';
  const email = Array.isArray(profile.emails) && profile.emails.length ? profile.emails[0].value : '';
  const avatar = Array.isArray(profile.photos) && profile.photos.length ? profile.photos[0].value : '';

  return authModel.createOrUpdateOAuthUser({
    provider,
    providerId,
    displayName,
    email,
    avatar,
  });
}

if (githubClientID && githubClientSecret) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: githubClientID,
        clientSecret: githubClientSecret,
        callbackURL: `${callbackBase}`,
      },
      (accessToken, refreshToken, profile, done) => {
        const user = buildOAuthUser('github', profile);
        done(null, user);
      }
    )
  );
}

function ensureGitHubConfigured(req, res, next) {
  if (!githubClientID || !githubClientSecret) {
    return res.status(500).send('GitHub auth is not configured');
  }
  next();
}

function githubCallback(req, res) {
  res.json({ authenticated: true, provider: 'github', user: req.user });
}

function status(req, res) {
  res.json({
    authenticated: req.isAuthenticated && req.isAuthenticated(),
    user: req.user || null,
  });
}

function failure(req, res) {
  res.status(401).send('Authentication failed');
}

function logout(req, res) {
  req.session = null;
  req.logout?.();
  res.json({ success: true });
}

function requireAuth(req, res, next) {
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }
  return res.status(401).send('Unauthorized - Authentication required Please log in.' );
}

module.exports = {
  passport,
  ensureGitHubConfigured,
  githubCallback,
  status,
  failure,
  logout,
  requireAuth,
};
