import { Google } from 'arctic';

const google = new Google(
  process.env.GOOGLE_CLIENT_ID ?? '',
  process.env.GOOGLE_CLIENT_SECRET ?? '',
  (process.env.BASE_URL ?? '') + '/api/auth/login/google/callback',
);

export default google;
