import { inject, injectable } from "inversify";
import { JwtTokenService } from "../services/jwt-token-service";
import { StatusCodes } from "http-status-codes";
import { Response, Request, NextFunction } from "express";
import { response } from "inversify-express-utils";
import { AuthMiddleware } from "#/company/ports/middlewares/authMiddleware";

@injectable()
export class JwtAuthMiddleware extends AuthMiddleware {
    public constructor(
      @inject(JwtTokenService)
      private readonly jwtTokenService: JwtTokenService
    ){
        super();
    }

    getId(req: Request, res: Response, next: NextFunction, token: string): void{
        try{
            const returnToken = this.jwtTokenService.verify(token);
            if(returnToken && typeof returnToken.sub === "string"){
                const id = parseInt(returnToken.sub);
                req.body.id = id;
                this.onSuccess(res);
            }
        }
        catch (e) {
            this.onInternalError(res);
        }
        next();
    }

    private onSuccess(@response() res: Response): () => Promise<void> {
        return async (): Promise<void> => {
            res.status(StatusCodes.CREATED).send();
        };
    }
  
    private onInternalError(@response() res: Response): () => Promise<void> {
        return async (): Promise<void> => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        };
    }
}