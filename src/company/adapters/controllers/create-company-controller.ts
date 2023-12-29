import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import {
    controller,
    httpPost,
    request,
    response,
} from "inversify-express-utils";
import { CreateCompanyCommand } from "../../../company/ports/commands/create-company-command";
import { OnboardingErrorMessage } from "../services/messages/errorMessage";

@controller("/company")
export class CreateCompanyController {
    public constructor(
    @inject(CreateCompanyCommand) private readonly command: CreateCompanyCommand
    ) {}

  @httpPost("/")
    public async createUser(@request() req: Request, @response() res: Response) {
        this.command.onSuccess = this.onSuccess(res);
        this.command.onInternalError = this.onInternalError(res);
        this.command.onUserAlreadyExists = this.onUserAlreadyExists(res);
        if (req.body.company) {
            await this.command.execute(req.body.company);
        } else {
            this.onIncorrectData(res);
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

  private onUserAlreadyExists(
    @response() res: Response
  ): (errors: OnboardingErrorMessage[]) => Promise<void> {
      return async (errors): Promise<void> => {
          res.status(StatusCodes.CONFLICT).send({ errors: errors });
      };
  }

  private onIncorrectData(@response() res: Response): () => Promise<void> {
      return async (): Promise<void> => {
          res.status(StatusCodes.BAD_REQUEST).send();
      };
  }
}
