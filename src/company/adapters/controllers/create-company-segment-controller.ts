import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { controller, httpPost, request, response } from "inversify-express-utils";
import { inject } from "inversify";
import { CreateCompanySegmentCommand } from "#/company/ports/commands/create-company-segment-command";

@controller ("/companySegment")
export class CreateCompanySegementController{
    public constructor(
    @inject(CreateCompanySegmentCommand)
    private readonly command: CreateCompanySegmentCommand
    ){}

  @httpPost("/")
    public async createCompanySegment(@request() req: Request, @response() res: Response){
        this.command.onInternalError = this.onInternalError(res);
        this.command.onSuccess = this.onSuccess(res);

        if(req.body.companySegment){
            await this.command.execute(req.body.companySegment);
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