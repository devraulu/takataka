import { Hono } from 'hono';
import googleApp from './google';

const loginApp = new Hono();

loginApp.route('/google', googleApp);

export default loginApp;
