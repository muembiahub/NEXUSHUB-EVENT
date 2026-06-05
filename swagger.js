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
  },
  apis: ['./routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = { swaggerUi, swaggerSpec }; 
