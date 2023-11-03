import { inject, injectable } from "inversify";
import { Company } from "../entities/company";
import { VerifyDataService } from "../services/verify-data-service";
import { CreateUserService } from "../services/create-user-service";
import { noop } from "../../../lib/noop";
import { OnboardingErrorMessage } from "../../../company/adapters/services/messages/errorMessage";
import { PlainCompany } from "../plain-company";

export interface OnboardingListeners {
  onSuccess: () => void;
  onUserAlreadyExists: (message: string) => void;
  onIncorrectData: () => void;
  onInternalError: () => void;
}

@injectable()
export class CreateCompanyCommand {
  public onSuccess: () => Promise<void> = noop;

  public onUserAlreadyExists: (
    errors: OnboardingErrorMessage[]
  ) => Promise<void> = noop;

  public onIncorrectData: () => Promise<void> = noop;

  public onInternalError: () => Promise<void> = noop;

  public constructor(
    @inject(VerifyDataService)
    private readonly verifyDataService: VerifyDataService,
    @inject(CreateUserService)
    private readonly createUserService: CreateUserService,
    @inject(PlainCompany)
    private readonly plainCompany: PlainCompany
  ) {}

  public async execute(company: Company): Promise<void> {
    try {
      const isAvaiable = await this.verifyDataService.verifyData(
        company,
        this.onUserAlreadyExists,
        this.onInternalError
      );
      if (isAvaiable) {
        const plainCompany = this.plainCompany.execute(company);
        await this.createUserService.createUser(
          plainCompany,
          this.onInternalError,
          this.onSuccess
        );
      }
    } catch {
      return this.onInternalError();
    }
  }
}
