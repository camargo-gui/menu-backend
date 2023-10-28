import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { inject } from "inversify";
import { OnboardingCommand } from "onboarding/domain/commands/onboarding-command";
import { Post } from "routing-controllers";

export class OnboardingController {
    public constructor(
        @inject(OnboardingCommand) private readonly command: OnboardingCommand
    ) { }

    @Post("/users")
    public async createUser(req: Request, res: Response) {
        this.command.onSuccess = this.onSuccess(res);
        this.command.onInternalError = this.onInternalError(res);
        this.command.onUserAlreadyExists = this.onUserAlreadyExists(res);
        this.command.execute(req.body.user)
    }

    private onSuccess(res: Response): () => Promise<void> {
        return async (): Promise<void> => {
            res.status(StatusCodes.CREATED).send();
        };
    }

    private onInternalError(res: Response): () => Promise<void> {
        return async (): Promise<void> => {
            res.status(StatusCodes.INTERNAL_SERVER_ERROR).send();
        };
    }

    private onUserAlreadyExists(res: Response): () => Promise<void> {
        return async (): Promise<void> => {
            (message: string) => {
                res.status(400).send(message);
            };
        };
    }
}
