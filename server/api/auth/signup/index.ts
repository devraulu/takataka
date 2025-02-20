import { Hono } from 'hono';
import sessionRoute from './session';
import userRoute from './user';
import resendCodeRoute from './resend-code';

const signupRoute = new Hono();

signupRoute.route('/session', sessionRoute);
signupRoute.route('/user', userRoute);
signupRoute.route('resend-code', resendCodeRoute);

export default signupRoute;
