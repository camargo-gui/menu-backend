import { prismaClient } from "../../../client/prisma-client";
import { injectable } from "inversify";
import { Company } from "../../../company/ports/entities/company";
import { VerifyDataService } from "../../../company/ports/services/verify-data-service";

@injectable()
export class ConcreteVerifyDataService extends VerifyDataService {
  async verifyPhone(phone: string): Promise<boolean> {
    const existingUser = await prismaClient.company.findFirst({
      where: {
        phone: phone,
      },
    });

    if (existingUser) {
      return false;
    }

    return true;
  }

  async verifyEmail(email: string): Promise<boolean> {
    try {
      const existingUser = await prismaClient.company.findFirst({
        where: {
          email: email,
        },
      });
      if (existingUser) {
        return false;
      }
    } catch (e) {
      console.log(e);
    }

    return true;
  }

  public async verifyData(company: Company): Promise<boolean> {
    try {
      const isEmailValid = await this.verifyEmail(company.email);
      const isPhoneValid = await this.verifyPhone(company.phone);
      return isEmailValid && isPhoneValid;
    } catch (e) {
      console.log(e);
    }
    return false;
  }
}
