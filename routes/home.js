const express = require ('express');
const homepage  = require('../controllers/homepageControllers').homepage;
const router = express.Router();

/**
 * @swagger
 * /:
 *   get:
 *     summary: Homepage
 *     description: Returns the homepage message.
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', homepage);

module.exports = router;
