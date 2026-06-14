const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User management endpoints
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id: { type: string }
 *         name: { type: string }
 *         email: { type: string }
 *         organization: { type: string }
 *         role: { type: string }
 *         phone: { type: string }
 *         bio: { type: string }
 *         createdAt: { type: string, format: date-time }
 *         updatedAt: { type: string, format: date-time }
 *     UserInput:
 *       type: object
 *       required: [name, email, password]
 *       properties:
 *         name: { type: string }
 *         email: { type: string }
 *         password: { type: string }
 *         organization: { type: string }
 *         role: { type: string }
 *         phone: { type: string }
 *         bio: { type: string }
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name: { type: string }
 *         email: { type: string }
 *         password: { type: string }
 *         organization: { type: string }
 *         role: { type: string }
 *         phone: { type: string }
 *         bio: { type: string }
 */

router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;