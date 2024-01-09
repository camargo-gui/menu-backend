import { StatusCodes } from "http-status-codes";
import { controller, httpDelete, request, response} from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { DeleteCompanyCommand } from "../../../company/ports/commands/delete-company-command";
import { TokenService } from "../../../company/ports/services/token-service";
import { AuthMiddleware } from "../../../company/ports/middleware/auth-middleware";

@controller("/company/delete")
export class DeleteCompanyController {
  
    public constructor(
    @inject(DeleteCompanyCommand) private readonly command: DeleteCompanyCommand,
    @inject(TokenService) private readonly tokenService: TokenService,
    @inject(AuthMiddleware) private readonly middlware: AuthMiddleware,
    ) {}


  @httpDelete("/")
    public async deleteCompany(@request() req: Request, @response() res: Response) {
        this.middlware.auth(req, {onInternalError: this.onInternalError(res), onUnauthorized: this.onUnauthorized(res)});
        this.command.onSuccess = this.onSuccess(res);
        this.command.onInternalError = this.onInternalError(res);
        try{
            const token = req.headers.authorization?.split(" ")[1];
            const id = this.tokenService.verify(token ?? "")?.id;
            await this.command.execute(Number(id));
        } catch {
            this.onInternalError(res);
        }

    }

  private onSuccess(@response() res: Response): () => Promise<void> {
      return async (): Promise<void> => {
          res.status(StatusCodes.OK).send();
      };
  }

  private onInternalError(@response() res: Response): () => Promise<void> {
      return async (): Promise<void> => {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      };
  }

  private onUnauthorized(@response() res: Response): () => Promise<void> {
      return async (): Promise<void> => {
          res.status(StatusCodes.UNAUTHORIZED).send();
      };
  }
}