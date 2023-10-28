import { injectable } from "inversify";
import { User } from "../ entities/user";
import { OnboardingListeners } from "../commands/onboarding-command";

@injectable()
export abstract class VerifyDataService {
  abstract verifyData(
    user: User,
    onUserAlreadyExists: (message: string) => void
  ): Promise<void>;

  abstract verifyPhone(
    phone: string,
    onUserAlreadyExists: (message: string) => void
  ): Promise<void>;

  abstract verifyEmail(
    email: string,
    onUserAlreadyExists: (message: string) => void
  ): Promise<void>;

  abstract verifyUsername(
    username: string,
    onUserAlreadyExists: (message: string) => void
  ): Promise<void>;
}
