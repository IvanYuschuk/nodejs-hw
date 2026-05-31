import crypto from "crypto";
import { Session } from "../models/session.js";
import { ONE_DAY, FIFTEEN_MINUTES } from "../constants/time.js";

export const createSession = async (userId) => {
  const accessToken = crypto.randomUUID();
  const refreshToken = crypto.randomUUID();

  return Session.create({
    userId,
    accessToken,
    refreshToken,
    accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
    refreshTokenValidUntil: new Date(Date.now() + ONE_DAY),
  });

};

export const setCookies = (res, session) => {
  res.cookie("accessToken", session.accessToken, { httpOnly: true, secure: true, someSite: 'none', maxAge: FIFTEEN_MINUTES });
  res.cookie("refreshToken", session.refreshToken, { httpOnly: true, secure: true, someSite: 'none', maxAge: ONE_DAY });
  res.cookie("sessionId", session._id, { httpOnly: true, secure: true, someSite: 'none', maxAge: ONE_DAY });
};



