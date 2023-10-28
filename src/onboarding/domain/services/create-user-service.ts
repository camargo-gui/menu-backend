import { injectable } from "inversify";
import { User } from "../ entities/user";
import { OnboardingListeners } from "../commands/onboarding-command";

@injectable()
export abstract class CreateUserService {
  abstract createUser(user: User): Promise<void>;
}
