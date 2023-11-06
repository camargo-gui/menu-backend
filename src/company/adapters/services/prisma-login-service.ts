import { prismaClient } from "#/client/prisma-client";

import { LoginDatabaseReturn, LoginService } from "#/company/ports/services/login-service";
import { injectable } from "inversify";

@injectable()
export class PrismaLoginService extends LoginService{
    async login(document: string, onInternalError:() => Promise<void>): 
  Promise<LoginDatabaseReturn|undefined> {
        try{
            const company = await prismaClient.company.findUnique({
                where:{
                    document: document
                }
            });
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