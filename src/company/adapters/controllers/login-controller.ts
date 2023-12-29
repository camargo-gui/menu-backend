import { LoginCommand } from "#/company/ports/commands/login-command";
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import {
    controller,
    httpPost,
    request,
    response,
} from "inversify-express-utils";

@controller("/login")
export class LoginController {
    constructor(@inject(LoginCommand) private readonly command: LoginCommand) {}

  @httpPost("/")
    public async login(@request() req: Request, @response() res: Response) {
        this.command.onSuccess = this.onSuccess(res);
        this.command.onCompanyNotFound = this.onCompanyNotFound(res);
        this.command.onIncorrectPassword = this.onIncorrectPassword(res);
        this.command.onInternalError = this.onInternalError(res);
        const document = req.body.document;
        const password = req.body.password;
        if (document && password) {
            await this.command.execute({ document, password });
        } else {
            this.onBadRequest(res);
        }
    }

  private onSuccess(
    @response() res: Response
  ): (token: string) => Promise<void> {
      return async (token): Promise<void> => {
          res.status(StatusCodes.OK).send({ token: token });
      };
  }

  private onInternalError(@response() res: Response): () => Promise<void> {
      return async (): Promise<void> => {
          res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
      };
  }

  private onCompanyNotFound(@response() res: Response): () => Promise<void> {
      return async (): Promise<void> => {
          res.status(StatusCodes.NOT_FOUND).send();
      };
  }

  private onIncorrectPassword(@response() res: Response): () => Promise<void> {
      return async (): Promise<void> => {
          res.status(StatusCodes.UNAUTHORIZED).send();
      };
  }

  private onBadRequest(@response() res: Response): () => Promise<void> {
      return async (): Promise<void> => {
          res.status(StatusCodes.BAD_REQUEST).send();
      };
  }
}
