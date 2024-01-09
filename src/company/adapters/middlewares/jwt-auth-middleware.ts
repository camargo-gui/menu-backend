import { inject, injectable } from "inversify";
import { Request,} from "express";
import { AuthMiddleware } from "../../../company/ports/middleware/auth-middleware";
import { TokenService } from "../../../company/ports/services/token-service";
import { AuthListeners } from "#/company/ports/dto/auth-listeners";

@injectable()
export class JwtAuthMiddlewareHandler extends AuthMiddleware {
    public constructor(
      @inject(TokenService)
      private readonly jwtTokenService: TokenService
    ){
        super();
    }

    public async auth(req: Request, listeners: AuthListeners): Promise<void>{
        try{
            console.log("entrou");
            const token = req.headers.authorization;
            console.log("token ", token);
            if(token === undefined) {
                return listeners.onUnauthorized();
            }
            const payload = await this.jwtTokenService.verify(token);
            console.log(payload);
            if(!payload){
                return listeners.onUnauthorized();
            }
        }
        catch (e) {
            return listeners.onInternalError();
        }
    }
}