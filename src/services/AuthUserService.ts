import "dotenv/config";
import jwt from "jsonwebtoken";
import prismaClient from "../prisma";
class AuthUserService {
  async execute(email: string, password: string) {
    /** Create access token
     * You can verify the generated token in https://jwt.io/
     * The token will expire in 1 hours
     * */
    const accessToken = jwt.sign({
      aud: "AUTH",
      _id: email, // Change for _id
      role: "ADMIN",
      email: email
    }, process.env.JWT_SECRET, {
      expiresIn: "1h"
    });
    const user = await prismaClient.user.findFirst({
      where: {
        email: email,
        password: password
      }
    });
    return {user, accessToken};
  }
}

export { AuthUserService };