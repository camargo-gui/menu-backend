import { injectable } from "inversify";
import { Company } from "../entities/company";

@injectable()
export abstract class VerifyDataService {
  abstract verifyData(
    company: Company
  ): Promise<boolean>;

  abstract verifyPhone(
    phone: string
  ): Promise<boolean>;

  abstract verifyEmail(
    email: string
  ): Promise<boolean>;
}
