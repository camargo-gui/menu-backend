import { inject, injectable } from "inversify";
import { noop } from "lib/noop";
import { User } from "../ entities/user";
import { VerifyDataService } from "../services/verify-data-service";
import { CreateUserService } from "../services/create-user-service";

export interface OnboardingListeners {
  onSuccess: () => void;
  onUserAlreadyExists: (message: string) => void;
  onIncorrectData: () => void;
  onInternalError: () => void;
}

@injectable()
export class OnboardingCommand {
  public onSuccess: () => Promise<void> = noop;

  public onUserAlreadyExists: (message: string) => Promise<void> = noop;

  public onIncorrectData: () => Promise<void> = noop;

  public onInternalError: () => Promise<void> = noop;

  public constructor(
    @inject(VerifyDataService) private readonly verifyDataService: VerifyDataService,
    @inject(CreateUserService) private readonly createUserService: CreateUserService
  ) {}

  public async execute(user: User): Promise<void> {
    try {
      await this.verifyDataService.verifyData(user, this.onUserAlreadyExists);
      await this.createUserService.createUser(user);
      this.onSuccess();
    } catch {
      this.onInternalError();
    }
  }
}
