import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerConfig: swaggerJSDoc.OAS3Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Payment Service',
      description: 'Documentação da API do projeto Payment Service.',
      version: '1.0.0'
    },
    host: 'localhost:3001',
    // Não obrigatório, serve apenas para definir a ordem das categorias
    tags: [],
    externalDocs: {
      description: 'View swagger.json',
      url: '../swagger.json'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          in: 'header',
          type: 'http',
          scheme: 'bearer'
        }
      }
    }
  },
  apis: ['src/controllers/*.ts', 'controllers/*.js']
};