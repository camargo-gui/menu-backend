import { CompanyRepository } from "#/company/ports/repositories/company-repository";
import { noop } from "#/lib/noop";
import { inject, injectable } from "inversify";
import { DefaultListeners } from "../dto/default-listeners";

@injectable()
export class DeleteCompanyCommand {
    public onSuccess: () => Promise<void> = noop;

    public onInternalError: () => Promise<void> = noop;

    public listeners: DefaultListeners = {
        onSuccess: this.onSuccess,
        onInternalError: this.onInternalError,
    };

    public constructor(
      @inject(CompanyRepository)
      private readonly companyRepository: CompanyRepository
    ){}

    public async execute(id: number): Promise<void> {
        try{
            await this.companyRepository.delete(id, this.listeners);
            return this.onSuccess();
        } catch {
            return this.onInternalError();
        }
    }
}