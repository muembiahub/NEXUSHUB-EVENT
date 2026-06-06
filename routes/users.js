const express = require('express');
const userController = require('../controllers/usersController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: User management endpoints
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get('/', userController.getUsers);

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 */
router.get('/:id', userController.getUser);


/**
 * @swagger
 * /users/create:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jonathan Muembia
 *               email:
 *                 type: string
 *                 example: jonathan@example.com
 *               password:
 *                 type: string
 *                 example: "********"
 *               organization:
 *                 type: string
 *                 example: NexusHub
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: './models/userModel'
 *       400:
 *         description: Invalid user data
 *       500:
 *         description: Server error
 */
router.post('/create',(req, res) => userController.createUser(req, res));

/**
 * @swagger
 * /users/update/{id}:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Jonathan Muembia
 *               email:
 *                 type: string
 *                 example: jonathan@example.com
 *               password:
 *                 type: string
 *                 example: "********"
 *               organization:
 *                 type: string
 *                 example: NexusHub
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       200:
 *         description: User updated
 *       404:
 *         description: User not found with given ID
 *       500:
 *         description: Server error
 */
router.put('/update/:id', (req, res) => userController.updateUser(req, res));


/**
 * @swagger
 * /users/delete/{id}:
 *   delete:
 *     summary: Delete a user
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted
 *       404:
 *         description: User not found
 */
router.delete('/delete/:id', userController.deleteUser);



module.exports = router;
