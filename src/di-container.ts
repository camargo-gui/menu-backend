import { Container } from "inversify";
import { CreateCompanyCommand } from "./company/ports/commands/create-company-command";
import { VerifyDataService } from "./company/ports/services/verify-data-service";
import { ConcreteVerifyDataService } from "./company/adapters/services/concrete-verify-data-service";
import { CompanyRepository } from "./company/ports/repositories/company-repository";
import { CryptoPasswordHash } from "./company/adapters/services/crypto-password-hash";
import { PlainCompany } from "./company/ports/plain-company";
import { ConcretePlainCompany } from "./company/adapters/concrete-plain-company";
import { PasswordHash } from "./company/ports/services/password-hash";
import { LoginService } from "./company/ports/services/login-service";
import { ConcreteLoginService } from "./company/adapters/services/concrete-login-service";
import { LoginCommand } from "./company/ports/commands/login-command";
import { TokenService } from "./company/ports/services/token-service";
import { JwtTokenService } from "./company/adapters/services/jwt-token-service";
import { PrismaCompanyRepository } from "#/company/adapters/repositories/prisma-company-repository";
import { DeleteCompanyCommand } from "./company/ports/commands/delete-company-command";

const diContainer = new Container();

//Company
diContainer.bind(CreateCompanyCommand).toSelf();
diContainer.bind(CompanyRepository).to(PrismaCompanyRepository);
diContainer.bind(VerifyDataService).to(ConcreteVerifyDataService);
diContainer.bind(PasswordHash).to(CryptoPasswordHash);
diContainer.bind(PlainCompany).to(ConcretePlainCompany);
diContainer.bind(DeleteCompanyCommand).toSelf();

//Login
diContainer.bind(LoginCommand).toSelf();
diContainer.bind(LoginService).to(ConcreteLoginService);
diContainer.bind(TokenService).to(JwtTokenService);

export {diContainer};