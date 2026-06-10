const express = require('express');
const controller = require('../controllers/registrationsController');
const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Registrations
 *     description: Registration endpoints
 */

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Get all registrations
 *     tags: [Registrations]
 *     responses:
 *       200:
 *         description: List of registrations
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registration'
 *       500:
 *         description: Server error
 */
router.get('/', controller.getRegistrations);

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Create a new registration
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegistrationInput'
 *     responses:
 *       201:
 *         description: Registration created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Server error
 */
router.post('/', controller.createRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   put:
 *     summary: Update a registration
 *     tags: [Registrations]
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
 *             $ref: '#/components/schemas/RegistrationUpdate'
 *     responses:
 *       200:
 *         description: Registration updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Server error
 */
router.put('/:id', controller.updateRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Delete a registration
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration deleted
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', controller.deleteRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   get:
 *     summary: Get a registration by ID
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Server error
 */
router.get('/:id', controller.getRegistration);

module.exports = router;
