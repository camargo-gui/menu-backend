import { CompanySegment } from "../entities/company-segment";

export abstract class CompanySegmentRepository{
  abstract create(
    companySegment: CompanySegment,
    onSuccess: () => Promise<void>,
    onInternalError: () => Promise<void>
  ): Promise<void>

  abstract getSegment(
    id: number
  ): Promise<CompanySegment | null>
}