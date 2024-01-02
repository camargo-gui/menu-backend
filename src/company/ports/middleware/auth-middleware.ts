import {Request, Response,  NextFunction } from "express";

export abstract class AuthMiddleware {
  abstract use(req: Request, res: Response, next: NextFunction):void
}