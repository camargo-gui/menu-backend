import { inject, injectable } from "inversify";
import { JwtTokenService } from "../services/jwt-token-service";
import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction, RequestHandler } from "express";
import { response } from "inversify-express-utils";
import { getFromContainer } from "routing-controllers";
import { AuthMiddleware } from "#/company/ports/middleware/auth-middleware";

@injectable()
export class JwtAuthMiddlewareHandler extends AuthMiddleware {
    public constructor(
      @inject(JwtTokenService)
      private readonly jwtTokenService: JwtTokenService
    ){
        super();
    }

    use(req: Request, res: Response, next: NextFunction): void{
        try{
            const token = req.headers.authorization;
            if(token === undefined) {
                this.onUnauthorized(res);
                return;
            }
            const payload = this.jwtTokenService.verify(token);
            if(payload){
                return next();
            }
            this.onUnauthorized(res);
        }
        catch (e) {
            this.onInternalError(res);
        }
    }

    private onUnauthorized(@response() res: Response): () => Promise<void> {
        return async (): Promise<void> => {
            res.status(StatusCodes.UNAUTHORIZED).send();
        };
    }
  
    private onInternalError(@response() res: Response): () => Promise<void> {
        return async (): Promise<void> => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        };
    }
}

export function JwtAuthMiddleware (): RequestHandler {
    console.log("teste");
    return async (req: Request, res: Response, next: NextFunction):Promise<void> => 
        getFromContainer(JwtAuthMiddlewareHandler)
            .use(req, res, next);
       
}