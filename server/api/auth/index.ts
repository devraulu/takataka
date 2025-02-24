import { Hono } from 'hono';
import loginApp from './login';

const authRoute = new Hono();

authRoute.route('/login', loginApp);

export default authRoute;
