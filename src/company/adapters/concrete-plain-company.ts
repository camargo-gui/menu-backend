import { Company } from "../../company/ports/entities/company";
import { PlainCompany } from "../../company/ports/plain-company";
import { PasswordHash } from "../../company/ports/services/password-hash";
import { inject, injectable } from "inversify";

@injectable()
export class ConcretePlainCompany extends PlainCompany {

  constructor(
        @inject(PasswordHash) private readonly passwordHash: PasswordHash
  ){
    super();
  }

  public execute(company: Company): Company{
    const password = this.passwordHash.create(company.password);


    const plainedCompany = new Company(
      company.name,
      company.document,
      company.phone,
      company.email,
      password,
      company.id_segment
    );

    return plainedCompany;
  }
}