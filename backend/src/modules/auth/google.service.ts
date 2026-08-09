import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyGoogleToken = async (idToken: string) => {
  if (!process.env.GOOGLE_CLIENT_ID) {
    throw new Error("GOOGLE_CLIENT_ID is not configured");
  }

  const ticket = await client.verifyIdToken({
    idToken,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const payload = ticket.getPayload();

  if (!payload) {
    throw new Error("Invalid Google token");
  }

  if (!payload.sub) {
    throw new Error("Google account ID not found");
  }

  if (!payload.email) {
    throw new Error("Google email not found");
  }

  return {
    googleId: payload.sub,
    email: payload.email,
    name: payload.name ?? "Google User",
    avatar: payload.picture ?? null,
    emailVerified: payload.email_verified === true,
  };
};
