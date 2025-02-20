import { Hono } from 'hono';
import verifyEmailRoute from './verify-email';
import updatePasswordRoute from './update-password';
import sessionRoute from './session';

const passwordResetRoute = new Hono();

passwordResetRoute.route('/verify-email', verifyEmailRoute);
passwordResetRoute.route('/update-password', updatePasswordRoute);
passwordResetRoute.route('/session', sessionRoute);

export default passwordResetRoute;
