import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  id: string
}

export function ensureAuth(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).send({ message: "INVALID_TOKEN" });
  }

  const [, token] = authToken.split(" ");
  try {
    const { id } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.userId = id;
    return next();
  } catch (error) {
    if(error.name == "TokenExpiredError"){
      response.status(401).send({message: "EXPIRED_TOKEN"});
      return;
    }
    return response.status(401).send({ message: "INVALID_TOKEN" });
  }
}