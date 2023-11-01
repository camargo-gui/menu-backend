import { inject, injectable } from "inversify";
import { noop } from "lib/noop";
import { Company } from "../entities/company";
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
    @inject(VerifyDataService)
    private readonly verifyDataService: VerifyDataService,
    @inject(CreateUserService)
    private readonly createUserService: CreateUserService
  ) {}

  public async execute(company: Company): Promise<void> {
    try {
      const isValid = await this.verifyDataService.verifyData(company);
      if (!isValid) {
        this.onUserAlreadyExists("Dados inválidos");
      }
      await this.createUserService.createUser(company, this.onInternalError);
      this.onSuccess();
    } catch {
      this.onInternalError();
    }
  }
}
