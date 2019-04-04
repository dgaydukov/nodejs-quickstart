
import * as Serve from 'koa-static';
import * as Mount from 'koa-mount';


export const StaticServerMiddleware = Mount('/public', Serve(__dirname + '/../../public'));