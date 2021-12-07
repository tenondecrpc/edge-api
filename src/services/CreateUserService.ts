import "dotenv/config";
import jwt from "jsonwebtoken";
import randToken from 'rand-token';
import { prismaClient } from "../prisma";

class CreateUserService {
  async execute(name: string, role: string, email: string, password: string) {
    // Create new refresh token
    const refreshToken = randToken.uid(256);
    const user = await prismaClient.user.create({
      data: {
        name,
        role,
        email,
        password,
        refreshToken
      }
    });
    /** Create access token
     * You can verify the generated token in https://jwt.io/
     * The token will expire in 1 hours
     * */
    const accessToken = jwt.sign({
      aud: "AUTH",
      id: user.id,
      role: "ADMIN",
      email: email
    }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    return {user, accessToken};
  }
}

export { CreateUserService };