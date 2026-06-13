const express = require('express');
const controller = require('../controllers/registrationsController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Registrations
 *   description: Event registration management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Registration:
 *       type: object
 *       required:
 *         - userId
 *         - eventId
 *       properties:
 *         _id:
 *           type: string
 *           example: "66b23e072913bf2194c8ccbe"
 *         userId:
 *           type: string
 *           example: "66a23e072913bf2194c8cc111"
 *         eventId:
 *           type: string
 *           example: "66a23e072913bf2194c8cc222"
 *         status:
 *           type: string
 *           example: "registered"
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     CreateRegistration:
 *       type: object
 *       required:
 *         - userId
 *         - eventId
 *       properties:
 *         userId:
 *           type: string
 *           example: "66a23e072913bf2194c8cc111"
 *         eventId:
 *           type: string
 *           example: "66a23e072913bf2194c8cc222"
 *         status:
 *           type: string
 *           example: "registered"
 *
 *     UpdateRegistration:
 *       type: object
 *       required:
 *         - userId
 *         - eventId
 *         - status
 *       properties:
 *         userId:
 *           type: string
 *           example: "66a23e072913bf2194c8cc111"
 *         eventId:
 *           type: string
 *           example: "66a23e072913bf2194c8cc222"
 *         status:
 *           type: string
 *           example: "attended"
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
 *     summary: Get registration by ID
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66b23e072913bf2194c8ccbe"
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
 *     summary: Create registration
 *     tags: [Registrations]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateRegistration'
 *           example:
 *             userId: "66a23e072913bf2194c8cc111"
 *             eventId: "66a23e072913bf2194c8cc222"
 *             status: "registered"
 *     responses:
 *       201:
 *         description: Registration created
 *       400:
 *         description: Invalid request
 */
router.post('/', controller.createRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   put:
 *     summary: Update registration (full update)
 *     description: Requires full data (userId, eventId, status)
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66b23e072913bf2194c8ccbe"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRegistration'
 *           example:
 *             userId: "66a23e072913bf2194c8cc111"
 *             eventId: "66a23e072913bf2194c8cc222"
 *             status: "attended"
 *     responses:
 *       200:
 *         description: Registration updated
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Registration not found
 */
router.put('/:id', controller.updateRegistration);

/**
 * @swagger
 * /registrations/{id}:
 *   delete:
 *     summary: Delete registration
 *     tags: [Registrations]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "66b23e072913bf2194c8ccbe"
 *     responses:
 *       200:
 *         description: Registration deleted
 *       404:
 *         description: Registration not found
 */
router.delete('/:id', controller.deleteRegistration);

module.exports = router;