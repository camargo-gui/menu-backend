import { prismaClient } from "../../../client/prisma-client";
import { injectable } from "inversify";
import { Company } from "../../../company/ports/entities/company";
import { VerifyDataService } from "../../../company/ports/services/verify-data-service";
import { OnboardingErrorMessage } from "./messages/errorMessage";

@injectable()
export class ConcreteVerifyDataService extends VerifyDataService {
  async verifyPhone(phone: string): Promise<boolean> {
    try {
      const existingCompany = await prismaClient.company.findFirst({
        where: {
          phone: phone,
        },
      });

      if (!existingCompany) {
        return true;
      }
    } catch (e) {
      console.log(e);
    }
    return false;
  }

  async verifyEmail(email: string): Promise<boolean> {
    try {
      const existingCompany = await prismaClient.company.findFirst({
        where: {
          email: email,
        },
      });
      if (!existingCompany) {
        return true;
      }
    } catch (e) {
      console.log(e);
    }

    return false;
  }

  async verifyDocument(document: string): Promise<boolean> {
    try{
      const existingCompany = await prismaClient.company.findFirst({
        where:{
          document
        }
      });
      if(!existingCompany){
        return true;
      }
    }catch(e){
      console.log(e);
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
    if (!isDocumentValid) errors.push(OnboardingErrorMessage.documentAlreadyExists);
    return errors;
  }

  hasError(errors: OnboardingErrorMessage[]): boolean {
    return errors.length > 0;
  }

  public async verifyData(
    company: Company,
    onUserAlreadyExists: (errors: OnboardingErrorMessage[]) => Promise<void>
  ): Promise<boolean> {
    try {
      const isEmailValid = await this.verifyEmail(company.email);
      const isPhoneValid = await this.verifyPhone(company.phone);
      const isDocumentValid = await this.verifyDocument(company.document);
      const errors = this.handleErrors(isEmailValid, isPhoneValid, isDocumentValid);
      if (!this.hasError(errors)) {
        return true;
      }
      onUserAlreadyExists(errors);
    } catch (e) {
      console.log(e);
    }
    return false;
  }
}
