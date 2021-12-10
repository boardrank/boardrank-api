import { OAuth2Client, TokenPayload } from 'google-auth-library';

const ISS = 'accounts.google.com';
let OAUTH_GOOGLE_CLIENT_ID;
let client;

const getOauthGoogleClientId = () => {
  if (!OAUTH_GOOGLE_CLIENT_ID) {
    OAUTH_GOOGLE_CLIENT_ID = process.env.OAUTH_GOOGLE_CLIENT_ID;
  }

  return OAUTH_GOOGLE_CLIENT_ID;
};

const getClient = () => {
  if (!client) {
    client = new OAuth2Client(getOauthGoogleClientId());
  }

  return client;
};

export const verifyIdToken = async (idToken: string) => {
  try {
    const client = getClient();
    const ticket = await client.verifyIdToken({
      idToken,
      audience: getOauthGoogleClientId(),
    });

    const payload = ticket.getPayload();

    if (validate(payload)) return payload;
  } catch (error) {
    return null;
  }
};

export const validate = ({ iss, aud }: TokenPayload) => {
  return (
    iss.replace('https://', '') === ISS && aud === getOauthGoogleClientId()
  );
};
