const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();


authRouter.get('/login', authController.ensureGitHubConfigured, authController.passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/callback', authController.passport.authenticate('github', { failureRedirect: '/' }), authController.githubCallback);

authRouter.post('/logout', authController.logout);


module.exports = authRouter;
