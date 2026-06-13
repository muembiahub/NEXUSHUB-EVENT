const express = require('express');
const controller = require('../controllers/eventsController');

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6a23e072913bf2194c8ccbea"
 *         name:
 *           type: string
 *           example: "AI Showcase"
 *         description:
 *           type: string
 *           example: "An afternoon of product demos from startups building practical AI tools."
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-09-10T13:00:00.000Z"
 *         location:
 *           type: string
 *           example: "NexusHub Demo Theater"
 *         capacity:
 *           type: integer
 *           example: 150
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     EventInput:
 *       type: object
 *       required:
 *         - name
 *         - date
 *       properties:
 *         name:
 *           type: string
 *           example: "AI Showcase"
 *         description:
 *           type: string
 *           example: "An afternoon of product demos from startups building practical AI tools."
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-09-10T13:00:00.000Z"
 *         location:
 *           type: string
 *           example: "NexusHub Demo Theater"
 *         capacity:
 *           type: integer
 *           example: 150
 *
 *     EventUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "AI Showcase 2026"
 *         description:
 *           type: string
 *           example: "Updated event description"
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2026-09-15T13:00:00.000Z"
 *         location:
 *           type: string
 *           example: "Innovation Center"
 *         capacity:
 *           type: integer
 *           example: 200
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management endpoints
 */

/**
 * @swagger
 * /events:
 *   get:
 *     summary: Get all events
 *     tags: [Events]
 *     responses:
 *       200:
 *         description: List of events
 */
router.get('/', controller.getEvents);

/**
 * @swagger
 * /events:
 *   post:
 *     summary: Create a new event
 *     tags: [Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EventInput'
 *           example:
 *             name: "AI Showcase"
 *             description: "Find the way to build the next big thing"
 *             date: "2026-09-10T13:00:00.000Z"
 *             location: "Lubumbashi"
 *             capacity: 500
 *     responses:
 *       201:
 *         description: Event created successfully
 *       400:
 *         description: Validation error
 */
router.post('/', controller.createEvent);

/**
 * @swagger
 * /events/{id}:
 *   get:
 *     summary: Get an event by ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event found
 *       404:
 *         description: Event not found
 */
router.get('/:id', controller.getEvent);

/**
 * @swagger
 * /events/{id}:
 *   put:
 *     summary: Update an event
 *     tags: [Events]
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
 *             $ref: '#/components/schemas/EventUpdate'
 *           example:
 *             name: "Showcase 2035"
 *             description: "Technology event"
 *             date: "2026-09-15T13:00:00.000Z"
 *             location: "Innovation Center"
 *             capacity: 200
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
router.put('/:id', controller.updateEvent);

/**
 * @swagger
 * /events/{id}:
 *   delete:
 *     summary: Delete an event
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
router.delete('/:id', controller.deleteEvent);

module.exports = router;