import { injectable } from "inversify";
import { Company } from "../entities/company";
import { OnboardingErrorMessage } from "../../../company/adapters/services/messages/errorMessage";

@injectable()
export abstract class VerifyDataService {
  abstract verifyData(
    company: Company,
    onUserAlreadyExists: (errors: OnboardingErrorMessage[]) => Promise<void>,
    onInternalError: () => Promise<void>
  ): Promise<boolean>;

  abstract handleErrors(
    isEmailValid: boolean,
    isPhoneValid: boolean,
    isDocumentValid:boolean,
  ): OnboardingErrorMessage[];

  abstract verifyPhone(phone: string): Promise<boolean>;

  abstract verifyEmail(email: string): Promise<boolean>;

  abstract verifyDocument(document:string): Promise<boolean>;

  abstract hasError(errors:OnboardingErrorMessage[]): boolean;
}
