import "dotenv/config";
import jwt from "jsonwebtoken";
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
    console.log('accessToken', accessToken);
    return accessToken;
  }
}

export { AuthUserService };