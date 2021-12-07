import "dotenv/config";
import jwt from "jsonwebtoken";
import randToken from 'rand-token';
import { prismaClient } from "../prisma";
class AuthUserService {
  async execute(email: string) {
    const user = await prismaClient.user.findFirst({
      where: {
        email: email
      }
    });
    if (!user) return { user };
    
    /** Create access token
     * You can verify the generated token in https://jwt.io/
     * The token will expire in 1 hours
     * */
    const accessToken = jwt.sign({
      aud: "AUTH",
      id: user.id,
      role: user.role,
      email: email
    }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    // Create new refresh token
    const refreshToken = randToken.uid(256);

    return {user, accessToken, refreshToken};
  }
}

export { AuthUserService };