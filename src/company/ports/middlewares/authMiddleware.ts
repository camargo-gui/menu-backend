import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";

@injectable()
export abstract class AuthMiddleware {
  abstract getId(req: Request, res:Response, next: NextFunction, token: string): void;
}