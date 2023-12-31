import { StatusCodes } from "http-status-codes";
import { controller, httpDelete, request, response } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { DeleteCompanyCommand } from "#/company/ports/commands/delete-company-command";

@controller("/company/delete")
export class DeleteCompanyController {
  
    public constructor(
    @inject(DeleteCompanyCommand) private readonly command: DeleteCompanyCommand
    ) {}

  @httpDelete("/")
    public async deleteCompany(@request() req: Request, @response() res: Response, id: number) {
        this.command.onSuccess = this.onSuccess(res);
        this.command.onInternalError = this.onInternalError(res);
        try{
            await this.command.execute(id);
        } catch {
            this.onInternalError(res);
        }

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