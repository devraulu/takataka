import { Hono } from 'hono';
import googleApp from './google';

const loginRoute = new Hono();

loginRoute.route('/google', googleApp);

export default loginRoute;
