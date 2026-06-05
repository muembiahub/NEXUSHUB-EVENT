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
 */
router.get('/', controller.getRegistrations);

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
 *       404:
 *         description: Registration not found
 */
router.get('/:id', controller.getRegistration);

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
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               eventId:
 *                 type: string
 *               status:
 *                 type: string
 *     responses:
 *       201:
 *         description: Registration created
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
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *     responses:
 *       200:
 *         description: Registration updated
 *       404:
 *         description: Registration not found
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
 */
router.delete('/:id', controller.deleteRegistration);

module.exports = router;
