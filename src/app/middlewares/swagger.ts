
const koaSwagger = require('koa2-swagger-ui');


export const swaggerMiddleware = koaSwagger({
    routePrefix: '/v1/swagger',
    swaggerOptions: {
        url: '/public/swagger.json',
    },
});