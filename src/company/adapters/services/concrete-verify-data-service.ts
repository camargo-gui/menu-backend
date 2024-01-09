import { inject, injectable } from "inversify";
import { Company } from "../../ports/entities/company";
import { VerifyDataService } from "../../ports/services/verify-data-service";
import { OnboardingErrorMessage } from "./messages/errorMessage";
import { CompanyRepository } from "../../../company/ports/repositories/company-repository";

@injectable()
export class ConcreteVerifyDataService extends VerifyDataService {

    constructor(
        @inject(CompanyRepository)
        private readonly companyRepository: CompanyRepository
    ){
        super();
    }

    async verifyPhone(phone: string): Promise<boolean> {
        try {
            const existingCompany = await this.companyRepository.getByPhone(phone);
            if (!existingCompany) {
                return true;
            }
        } catch (e) {
            throw new Error();
        }
        return false;
    }

    async verifyEmail(email: string): Promise<boolean> {
        try {
            const existingCompany = await this.companyRepository.getByEmail(email);
            if (!existingCompany) {
                return true;
            }
        } catch (e) {
            throw new Error();
        }

        return false;
    }

    async verifyDocument(document: string): Promise<boolean> {
        try {
            const existingCompany = await this.companyRepository.getByDocument(document);
            if (!existingCompany) {
                return true;
            }
        } catch (e) {
            throw new Error();
        }
        return false;
    }

    handleErrors(
        isEmailValid: boolean,
        isPhoneValid: boolean,
        isDocumentValid: boolean
    ): OnboardingErrorMessage[] {
        const errors = [];
        if (!isEmailValid) errors.push(OnboardingErrorMessage.emailAlreadyExists);
        if (!isPhoneValid) errors.push(OnboardingErrorMessage.phoneAlreadyExists);
        if (!isDocumentValid)
            errors.push(OnboardingErrorMessage.documentAlreadyExists);
        return errors;
    }

    hasError(errors: OnboardingErrorMessage[]): boolean {
        return errors.length > 0;
    }

    public async verifyData(
        company: Company,
        onUserAlreadyExists: (errors: OnboardingErrorMessage[]) => Promise<void>,
        onInternalError: () => Promise<void>
    ): Promise<boolean> {
        try {
            const isEmailValid = await this.verifyEmail(company.email);
            const isPhoneValid = await this.verifyPhone(company.phone);
            const isDocumentValid = await this.verifyDocument(company.document);
            const errors = this.handleErrors(
                isEmailValid,
                isPhoneValid,
                isDocumentValid
            );
            if (!this.hasError(errors)) {
                return true;
            }
            onUserAlreadyExists(errors);
        } catch (e) {
            onInternalError();
        }
        return false;
    }
}
