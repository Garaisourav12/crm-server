// src/config/swagger.ts
import { Express } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

// OpenAPI options
const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRM API',
      version: '1.0.0',
      description: 'Fastor CRM — API documentation',
    },
    servers: [
      {
        url:
          process.env.NODE_ENV === 'production'
            ? 'https://crm-server-q5ga.onrender.com/api'
            : `http://localhost:${process.env.PORT || 8080}/api`,
      },
    ],
    components: {
      securitySchemes: {
        CookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
        },
      },
      schemas: {
        // DTO → OpenAPI schema mapping (keep in sync with your DTOs)
        CreateUserDto: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            name: { type: 'string', example: 'Sourav Garai' },
            email: {
              type: 'string',
              format: 'email',
              example: 'sourav@example.com',
            },
            password: { type: 'string', example: 'strongPassword123' },
          },
        },
        LoginUserDto: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'sourav@example.com',
            },
            password: { type: 'string', example: 'strongPassword123' },
          },
        },
        CreateEnquiryDto: {
          type: 'object',
          required: ['name', 'email', 'courseInterest'],
          properties: {
            name: { type: 'string', example: 'Priya Sharma' },
            email: {
              type: 'string',
              format: 'email',
              example: 'priya@example.com',
            },
            courseInterest: {
              type: 'string',
              enum: [
                'Web Development',
                'Data Science',
                'Machine Learning',
                'Cloud Computing',
                'Cyber Security',
                'Digital Marketing',
                'UI/UX Design',
              ],
              example: 'Web Development',
            },
          },
        },
        UserResponse: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
        EnquiryResponse: {
          type: 'object',
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            email: { type: 'string' },
            courseInterest: { type: 'string' },
            claimedBy: { type: ['string', 'null'] },
            claimedAt: { type: ['string', 'null'], format: 'date-time' },
            createdAt: { type: 'string', format: 'date-time' },
            updatedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
  },
  // Files to scan for JSDoc/OpenAPI comments (route/controller files)
  apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express): void => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
