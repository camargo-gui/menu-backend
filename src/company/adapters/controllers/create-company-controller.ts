import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import {
  controller,
  httpPost,
  request,
  requestBody,
  response,
} from "inversify-express-utils";
import { OnboardingCommand } from "company/ports/commands/create-company-command";

@controller("/users")
export class CreateCompanyController {
  public constructor(
    @inject(OnboardingCommand) private readonly command: OnboardingCommand
  ) {}

  @httpPost("/")
  public async createUser(@request() req: Request, @response() res: Response) {
    this.command.onSuccess = this.onSuccess(res);
    this.command.onInternalError = this.onInternalError(res);
    this.command.onUserAlreadyExists = this.onUserAlreadyExists(res);
    if (req.body.company) {
      this.command.execute(req.body.company);
    } else {
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

  private onUserAlreadyExists(
    @response() res: Response
  ): (message: string) => Promise<void> {
    return async (): Promise<void> => {
      (message: string) => {
        res.status(StatusCodes.BAD_REQUEST).send(message);
      };
    };
  }
}
