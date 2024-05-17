const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Techie Laptops Web API',
        version: '1.0.0',
        description:
            'This file contains all the API endpoints, usage, and sample respoonses',
    },
}

const options = {
    swaggerDefinition,
    apis: [`${path.join(__dirname, 'server', 'routes', './*.js')}`],
}

const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec
