import { Hono } from 'hono';
import loginRoute from './login';
import logoutRoute from './logout';

const authRoute = new Hono();

authRoute.route('/login', loginRoute);
authRoute.route('/logout', logoutRoute);

export default authRoute;
