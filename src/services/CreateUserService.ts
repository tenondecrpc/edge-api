import "dotenv/config";
import jwt from "jsonwebtoken";
import randToken from 'rand-token';

class CreateUserService {
  async execute(prismaClient, data) {
    // Create new refresh token
    const refreshToken = randToken.uid(256);
    const user = await prismaClient.user.create({
      data: {
        ...data,
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
      role: user.role,
      email: user.email
    }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    return {user, accessToken};
  }
}

export { CreateUserService };