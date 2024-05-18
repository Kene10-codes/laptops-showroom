const swaggerJSDoc = require('swagger-jsdoc')
const path = require('path')

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Techie Laptops Web API',
        version: '1.0.0',
        description: 'Techie Laptops Endpoints',
    },
}

const options = {
    swaggerDefinition,
    apis: [`${path.resolve(__dirname, 'server', 'routes', './*.js')}`],
}

const swaggerSpec = swaggerJSDoc(options)
module.exports = swaggerSpec
