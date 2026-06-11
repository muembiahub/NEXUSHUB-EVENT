
const express = require('express');
const controller = require('../controllers/registrationsController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Registrations
 *     description: Manage event registrations
 */

/**
 * @swagger
 * /registrations:
 *   get:
 *     summary: Retrieve all registrations
 *     description: Returns a list of all event registrations.
 *     tags: [Registrations]
 *     responses:
 *       200:
 *         description: Registrations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Registration'
 *       500:
 *         description: Internal server error
 */
router.get('/', controller.getRegistrations);

/**
 * @swagger
 * /registrations/{id}:
 *   get:
 *     summary: Retrieve a registration by ID
 *     description: Returns a single registration with populated event details.
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Registration ID
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
 *         description: Internal server error
 */
router.get('/:id', controller.getRegistration);

/**
 * @swagger
 * /registrations:
 *   post:
 *     summary: Create a new registration
 *     description: Register a user for an event.
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRegistration'
 *           example:
 *             userId: "6a23e072913bf2194c8ccbe1"
 *             eventId: "6a23e071913bf2194c8ccbe9"
 *             status: "registered"
 *     responses:
 *       201:
 *         description: Registration created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Invalid request data
 *       500:
 *         description: Internal server error
 */
router.post('/', controller.createRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   put:
 *     summary: Update a registration
 *     description: Update registration information such as status.
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRegistration'
 *           example:
 *             status: "attended"
 *     responses:
 *       200:
 *         description: Registration updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Registration'
 *       400:
 *         description: Invalid request data
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Internal server error
 */
router.put('/:id', controller.updateRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Delete a registration
 *     description: Removes a registration from the system.
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Registration ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Registration deleted successfully
 *       404:
 *         description: Registration not found
 *       500:
 *         description: Internal server error
 */
router.delete('/:id', controller.deleteRegistration);

module.exports = router;