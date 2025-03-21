import CookiesEnum from '#root/lib/server/enum';
import google from '#root/lib/server/google';
import Env from '#root/server/env';
import { generateState, generateCodeVerifier } from 'arctic';
import { Hono } from 'hono';
import { setCookie } from 'hono/cookie';
import googleCallbackApp from './callback';

const googleApp = new Hono<Env>();

googleApp.get('/', async c => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = google.createAuthorizationURL(state, codeVerifier, [
    'openid',
    'profile',
    'email',
  ]);
  setCookie(c, CookiesEnum.GOOGLE_OAUTH_STATE, state, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10,
    sameSite: 'lax',
  });
  setCookie(c, CookiesEnum.GOOGLE_CODE_VERIFIER, codeVerifier, {
    path: '/',
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 10,
    sameSite: 'lax',
  });

  return c.redirect(url.toString());
});

googleApp.route('/callback', googleCallbackApp);

export default googleApp;
