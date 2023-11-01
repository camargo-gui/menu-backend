import { prismaClient } from "../../../client/prisma-client";
import { injectable } from "inversify";
import { Company } from "../../../company/ports/entities/company";
import { CreateUserService } from "../../../company/ports/services/create-user-service";

@injectable()
export class PrismaCreateCompany extends CreateUserService {
  async createUser(
    company: Company,
    onInternalError: () => Promise<void>
  ): Promise<void> {
    try {
      await prismaClient.company.create({
        data: company,
      });
    } catch (e) {
      return onInternalError();
    }
  }
}
