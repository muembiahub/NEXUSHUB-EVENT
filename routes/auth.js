const express = require('express');
const authController = require('../controllers/authController');

const authRouter = express.Router();


authRouter.get('/login', authController.ensureGitHubConfigured, authController.passport.authenticate('github', { scope: ['user:email'] }));

authRouter.get('/auth/github/callback', 
    authController.passport.authenticate('github', { failureRedirect: '/api-docs', session: true }),
    (req, res, next) => {
        // 1. Assign the user data to the session
        req.session.user = req.user;
        
        // 2. FORCE the session to save to memory/database before moving on
        req.session.save((err) => {
            if (err) {
                return next(err);
            }
            // 3. ONLY redirect once we are 100% sure the session is stored safely
            res.redirect('/');
        });
    }
);
authRouter.post('/logout', authController.logout);


module.exports = authRouter;
