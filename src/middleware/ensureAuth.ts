import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
  id: string,
  role: string
}

export function ensureAuth(request: Request, response: Response, next: NextFunction) {
  const authToken = request.headers.authorization;
  if (!authToken) {
    return response.status(401).send({ message: "INVALID_TOKEN" });
  }

  const [, token] = authToken.split(" ");
  try {
    const { id, role } = verify(token, process.env.JWT_SECRET) as IPayload;
    request.userId = id;
    request.role = role;
    return next();
  } catch (error) {
    if(error.name == "TokenExpiredError"){
      response.status(401).send({message: "EXPIRED_TOKEN"});
      return;
    }
    return response.status(401).send({ message: "INVALID_TOKEN" });
  }
}

export function requireRole(roles: string[]) {
  console.log('roles', roles);
  return function (request: Request, response: Response, next: NextFunction) {
    if (roles.some(requiredRole => (request.role === requiredRole))) {
			next();
    } else {
			next("route");
		}
	};
}

export function requireVersion(version: number) {
  return function (request: Request, response: Response, next: NextFunction) {
    if (!request.headers.version) {
      next();
      return;
    }
    if (request.headers.version != version.toString()) {
      next("route");
      return;
    }
		next();
	};
}