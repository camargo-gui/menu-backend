import { prismaClient } from "../../../client/prisma-client";
import { injectable } from "inversify";
import { Company } from "../../ports/entities/company";
import { CompanyRepository } from "#/company/ports/repositories/company-repository";


@injectable()
export class PrismaCompanyRepository extends CompanyRepository {
    async getByEmail(email: string): Promise<Company | null> {
        return prismaClient.company.findFirst({
            where: {
                email: email,
            },
        });
    }

    async getByPhone(phone: string): Promise<Company | null> {
        return prismaClient.company.findFirst({
            where: {
                phone: phone,
            },
        });
    }

    async getByDocument(document: string): Promise<Company | null> {
        return prismaClient.company.findFirst({
            where: {
                document,
            },
        });
    }

    async create(
        company: Company,
        onInternalError: () => Promise<void>,
        onSuccess: () => Promise<void>
    ): Promise<void> {
        try {
            await prismaClient.company.create({
                data: company,
            });
            return onSuccess();
        } catch (e) {
            return onInternalError();
        }
    }

}
