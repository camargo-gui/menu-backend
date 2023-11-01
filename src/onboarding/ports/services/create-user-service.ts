import { injectable } from "inversify";
import { User } from "../ entities/user";
import { OnboardingListeners } from "../commands/onboarding-command";

@injectable()
export abstract class CreateUserService {
  abstract createUser(user: User, onInternalError: () => Promise<void>): Promise<void>;
}
