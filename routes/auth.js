const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();

authRouter.get('/github', authController.ensureGitHubConfigured, authController.passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/github/callback', authController.passport.authenticate('github', { failureRedirect: '/auth/failure' }), authController.githubCallback);

authRouter.get('/google', authController.ensureGoogleConfigured, authController.passport.authenticate('google', { scope: ['profile', 'email'] }));

authRouter.get('/google/callback', authController.passport.authenticate('google', { failureRedirect: '/auth/failure' }), authController.googleCallback);

authRouter.get('/status', authController.status);

authRouter.get('/failure', authController.failure);

authRouter.post('/logout', authController.logout);

module.exports = authRouter;
