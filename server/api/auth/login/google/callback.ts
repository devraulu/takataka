import CookiesEnum from '#root/lib/server/enum';
import google from '#root/lib/server/google';
import {
  createSession,
  generateSessionToken,
  setSessionTokenCookie,
} from '#root/lib/server/session';
import { createUser, getUserFromGoogleId } from '#root/lib/server/user';
import { ObjectParser } from '@pilcrowjs/object-parser';
import { decodeIdToken, OAuth2Tokens } from 'arctic';
import { Hono } from 'hono';
import { getCookie } from 'hono/cookie';

const googleCallbackApp = new Hono();

googleCallbackApp.get('/', async c => {
  const { code, state } = c.req.query();

  const storedState = getCookie(c, CookiesEnum.GOOGLE_OAUTH_STATE);
  const storedCodeVerifier = getCookie(c, CookiesEnum.GOOGLE_CODE_VERIFIER);

  if (
    code == null ||
    state == null ||
    storedState == null ||
    storedCodeVerifier == null
  ) {
    return c.text('Restart the process', 400);
  }

  if (state !== storedState) {
    return c.text('Restart the process', 400);
  }

  let tokens: OAuth2Tokens;

  try {
    tokens = await google.validateAuthorizationCode(
      code,
      storedCodeVerifier,
    );
  } catch {
    return c.text('Restart the process', 400);
  }

  const unparsedClaims = decodeIdToken(tokens.idToken());
  const claims = new ObjectParser(unparsedClaims);

  let googleId;
  let email;
  try {
    googleId = claims.getString('sub');
    email = claims.getString('email');
  } catch {
    return c.text('Restart the process', 400);
  }

  const existingUser = await getUserFromGoogleId(googleId);
  if (existingUser != null) {
    const token = generateSessionToken();
    const session = await createSession(token, existingUser.id);
    setSessionTokenCookie(c, token, session.expiresAt);
    return c.redirect('/');
  }

  const user = await createUser(googleId, email);
  const token = generateSessionToken();
  const session = await createSession(token, user.id);
  setSessionTokenCookie(c, token, session.expiresAt);

  return c.redirect('/');
});

export default googleCallbackApp;
