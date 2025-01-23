import jwt from 'jsonwebtoken';

export const addToBlacklist = (token: string, redisClient: any) => {
  const decoded = jwt.decode(token) as { [key: string]: any };
  const exp = decoded?.exp;
  if (exp) {
    redisClient.setex(token, exp - Math.floor(Date.now() / 1000), "blacklisted");
  }
};