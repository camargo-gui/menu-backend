import { inject, injectable } from "inversify";
import { CompanySegmentRepository } from "../repositories/company-segment-repository";
import { noop } from "#/lib/noop";
import { CompanySegmentErrorMessage } from "#/company/adapters/services/messages/errorSegmentMessage";
import { CompanySegment } from "../entities/company-segment";

@injectable()
export class CreateCompanySegmentCommand{
    public constructor(
    @inject(CompanySegmentRepository)
    private readonly repository: CompanySegmentRepository
    ){}

    public onSuccess: () => Promise<void> = noop;
    public onInternalError: () => Promise<void> = noop;

    public async execute(companySegment: CompanySegment): Promise<void | string>{
        try{
            const canBeAdded = await this.repository.getSegment(companySegment.id);

            if(canBeAdded){
                await this.repository.create(
                    companySegment,
                    this.onSuccess,
                    this.onInternalError,
                );
            }
            else{
                return CompanySegmentErrorMessage.segmentAlreadyExists;
            }
        }
        catch {
            return this.onInternalError();
        }
    }
}