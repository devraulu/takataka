import { Hono } from 'hono';
import signup from './signup';
import session from './session';
import user from './user';
import emailVerification from './email-verification';
import passwordReset from './password-reset';

const authApp = new Hono();

authApp.route('/signup', signup);
authApp.route('/session', session);
authApp.route('/user', user);
authApp.route('/email-verification', emailVerification);
authApp.route('/password-reset', passwordReset);

export default authApp;
