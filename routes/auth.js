const express = require('express');
const passport = require('passport');

const router = express.Router();

/**

* Login with GitHub
  */
  router.get(
  '/login',
  passport.authenticate('github', {
  scope: ['user:email']
  })
  );

/**

* Logout
  */
  router.get('/logout', (req, res, next) => {
  req.logout((err) => {
  if (err) {
  return next(err);
  }

  req.session.destroy(() => {
  res.redirect('/');
  });
  });
  });

module.exports = router;
