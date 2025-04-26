import { Hono } from 'hono';
import signup from './signup';
import session from './session';
import user from './user';
import emailVerification from './email-verification';
import passwordReset from './password-reset';

const app = new Hono();

app.route('/signup', signup);
app.route('/session', session);
app.route('/user', user);
app.route('/email-verification', emailVerification);
app.route('/password-reset', passwordReset);

export default app;
