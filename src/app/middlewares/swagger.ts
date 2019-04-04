/**
 * Swagger middleware
 */

const koaSwagger = require('koa2-swagger-ui');


export const SwaggerMiddleware = koaSwagger({
    routePrefix: '/v1/swagger',
    swaggerOptions: {
        url: '/public/swagger.yaml',
    },
});