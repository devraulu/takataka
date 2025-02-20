import { Hono } from 'hono';
import recoveryCodeRoute from './recovery-code';
import totpRoute from './totp';

const verify2faRoute = new Hono();

verify2faRoute.route('/recovery-code', recoveryCodeRoute);
verify2faRoute.route('/totp', totpRoute);

export default verify2faRoute;
