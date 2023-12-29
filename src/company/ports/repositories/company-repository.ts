import { injectable } from "inversify";
import { Company } from "../entities/company";

@injectable()
export abstract class CompanyRepository {
  abstract create(
    company: Company,
    onInternalError: () => Promise<void>,
    onSuccess: () => Promise<void>
  ): Promise<void>;

  abstract getByEmail(
    email: string,
  ): Promise<Company | null>

  abstract getByPhone(
    phone: string,
  ): Promise<Company | null>

  abstract getByDocument(
    document: string,
  ): Promise<Company | null>

}
