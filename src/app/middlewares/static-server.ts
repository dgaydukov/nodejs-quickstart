
import * as Serve from 'koa-static';
import * as Mount from 'koa-mount';


/**
 * by default koa-static serve directory content to root url /, so we use
 * koa-mount to mount this static to desired url, in our case /public
 */
export const StaticServerMiddleware = Mount('/public', Serve(__dirname + '/../../public'));