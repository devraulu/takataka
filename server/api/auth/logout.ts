import {
  deleteSessionTokenCookie,
  invalidateSession,
} from '#root/lib/server/session';
import Env from '#root/server/env';
import { Hono } from 'hono';

const logoutRoute = new Hono<Env>();

logoutRoute.post('/', async c => {
  if (c.var.session == null) {
    return c.text('Unauthorized', 401);
  }
  await invalidateSession(c.var.session.token);
  deleteSessionTokenCookie(c);

  return c.redirect('/');
});

export default logoutRoute;
