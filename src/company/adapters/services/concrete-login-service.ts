import { CompanyRepository } from "#/company/ports/repositories/company-repository";

import { LoginDatabaseReturn, LoginService } from "#/company/ports/services/login-service";
import { inject, injectable } from "inversify";

@injectable()
export class ConcreteLoginService extends LoginService{
  
    constructor(
        @inject(CompanyRepository)
        private readonly companyRepository: CompanyRepository
    ){
        super();
    }

    async login(document: string, onInternalError:() => Promise<void>): 
  Promise<LoginDatabaseReturn|undefined> {
        try{
            const company = await this.companyRepository.getByDocument(document);
            if(company){
                return {
                    id:company.id,
                    password:company.password
                };
            }
            else{
                return undefined;
            }
        }catch{
            onInternalError();
        }
    }
}