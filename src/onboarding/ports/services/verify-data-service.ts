import { injectable } from "inversify";
import { User } from "../ entities/user";

@injectable()
export abstract class VerifyDataService {
  abstract verifyData(
    user: User
  ): Promise<boolean>;

  abstract verifyPhone(
    phone: string
  ): Promise<boolean>;

  abstract verifyEmail(
    email: string
  ): Promise<boolean>;

  abstract verifyUsername(
    username: string
  ): Promise<boolean>;
}
