import { StatusCodes } from "http-status-codes";
import { controller, httpDelete, request, response} from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { DeleteCompanyCommand } from "#/company/ports/commands/delete-company-command";
import { TokenService } from "#/company/ports/services/token-service";
import { UseBefore } from "routing-controllers";
import {JwtAuthMiddleware } from "#/company/adapters/middlewares/jwt-auth-middleware";

@controller("/company/delete")
export class DeleteCompanyController {
  
    public constructor(
    @inject(DeleteCompanyCommand) private readonly command: DeleteCompanyCommand,
    @inject(TokenService) private readonly tokenService: TokenService,
    ) {}


  @httpDelete("/")
  @UseBefore(JwtAuthMiddleware())
    public async deleteCompany(@request() req: Request, @response() res: Response) {
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
}