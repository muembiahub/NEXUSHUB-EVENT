const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger setup
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NEXUSHUB-EVENT API',
      version: '1.0.0',
      description: 'API documentation for NEXUSHUB-EVENT project using Swagger, including endpoints for users, events, registrations, and reviews.',
    },
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            organization: { type: 'string' },
            role: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        UserInput: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            organization: { type: 'string' },
            role: { type: 'string' }
          }
        },
        UserUpdate: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            password: { type: 'string' },
            organization: { type: 'string' },
            role: { type: 'string' }
          }
        },
        Event: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            title: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            location: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        EventInput: {
          type: 'object',
          required: ['title', 'date'],
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            location: { type: 'string' }
          }
        },
        EventUpdate: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            description: { type: 'string' },
            date: { type: 'string', format: 'date-time' },
            location: { type: 'string' }
          }
        },
        Registration: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            eventId: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        RegistrationInput: {
          type: 'object',
          required: ['userId', 'eventId'],
          properties: {
            userId: { type: 'string' },
            eventId: { type: 'string' }
          }
        },
        RegistrationUpdate: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            eventId: { type: 'string' }
          }
        },
        Review: {
          type: 'object',
          properties: {
            _id: { type: 'string' },
            userId: { type: 'string' },
            eventId: { type: 'string' },
            rating: { type: 'number', minimum: 0, maximum: 5 },
            comment: { type: 'string' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' }
          }
        },
        ReviewInput: {
          type: 'object',
          required: ['userId', 'eventId', 'rating'],
          properties: {
            userId: { type: 'string' },
            eventId: { type: 'string' },
            rating: { type: 'number', minimum: 0, maximum: 5 },
            comment: { type: 'string' }
          }
        },
        ReviewUpdate: {
          type: 'object',
          properties: {
            userId: { type: 'string' },
            eventId: { type: 'string' },
            rating: { type: 'number', minimum: 0, maximum: 5 },
            comment: { type: 'string' }
          }
        }
      }
    }
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec }; 
