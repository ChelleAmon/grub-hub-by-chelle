import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { RestoAdmin } from "../../shared/models/restoAdmin.model.js";

interface AuthRequest extends Request {
  restoAdmin?: RestoAdmin;
}
function authHandle(req: AuthRequest, res: Response, next: NextFunction) {
  const cookie = req.cookies["jwt"];
  console.log("auth", cookie)
  jwt.verify(
    cookie,
    process.env.ACCESS_TOKEN_SECRET as string,
    
    (err: any, result: any) => {
      console.log("Auth Result: ", result)
      if (err) {
        console.log("Error", err)
        return res.sendStatus(403);
      }
      if (result) {
        req.restoAdmin = result.restoAdmin;
      }
      next();
    }
  );

}

export const authHandler = authHandle;
