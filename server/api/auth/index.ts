import { Hono } from 'hono';
import loginApp from './login';

const authApp = new Hono();

authApp.route('/login', loginApp);

export default authApp;
