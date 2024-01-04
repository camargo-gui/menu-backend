import { prismaClient } from "#/client/prisma-client";
import { CompanySegment } from "#/company/ports/entities/company-segment";
import { CompanySegmentRepository } from "#/company/ports/repositories/company-segment-repository";

export class PrismaCompanySegmentRepository extends CompanySegmentRepository{
    async create(
        companySegment: CompanySegment,
        onSuccess: () => Promise<void>,
        onInternalError: () => Promise<void>
    ): Promise<void> {
        try{
            await prismaClient.companySegment.create({
                data: companySegment
            });
            return onSuccess();
        }
        catch(e) {
            return onInternalError();
        }
    }

    async getSegment(id: number): Promise<CompanySegment | null> {
        return prismaClient.companySegment.findFirst({
            where: {
                id: id
            }
        });
    }
}