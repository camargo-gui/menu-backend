import { injectable } from "inversify";
import { Company } from "../entities/company";

@injectable()
export abstract class CreateUserService {
  abstract createUser(company: Company, onInternalError: () => Promise<void>): Promise<void>;
}
