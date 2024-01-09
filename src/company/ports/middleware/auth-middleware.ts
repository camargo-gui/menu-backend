import { AuthListeners } from "#/company/ports/dto/auth-listeners";
import {Request } from "express";
import { injectable } from "inversify";

@injectable()
export abstract class AuthMiddleware {
  abstract auth(req: Request, listeners: AuthListeners):void
}