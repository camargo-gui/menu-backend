import { inject, injectable } from "inversify";
import { Company } from "../entities/company";
import { VerifyDataService } from "../services/verify-data-service";
import { CreateUserService } from "../services/create-user-service";
import { noop } from "../../../lib/noop";
import { OnboardingErrorMessage } from "company/adapters/services/messages/errorMessage";

export interface OnboardingListeners {
  onSuccess: () => void;
  onUserAlreadyExists: (message: string) => void;
  onIncorrectData: () => void;
  onInternalError: () => void;
}

@injectable()
export class CreateCompanyCommand {
  public onSuccess: () => Promise<void> = noop;

  public onUserAlreadyExists: (errors: OnboardingErrorMessage[]) => Promise<void> = noop;

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
      const isAvaiable = await this.verifyDataService.verifyData(company, this.onUserAlreadyExists);
      if(isAvaiable){
        await this.createUserService.createUser(company, this.onInternalError, this.onSuccess);
      }
    } catch {
      return this.onInternalError();
    }
  }
}
