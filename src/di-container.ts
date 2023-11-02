import { Container } from "inversify";
import { CreateCompanyCommand } from "./company/ports/commands/create-company-command";
import { VerifyDataService } from "./company/ports/services/verify-data-service";
import { ConcreteVerifyDataService } from "./company/adapters/services/concrete-verify-data-service";
import { PrismaCreateCompany } from "./company/adapters/services/prisma-create-company";
import { CreateUserService } from "./company/ports/services/create-user-service";
import { CryptoPasswordHash } from "./company/adapters/services/crypto-password-hash";
import { PlainCompany } from "./company/ports/plain-company";
import { ConcretePlainCompany } from "./company/adapters/concrete-plain-company";
import { PasswordHash } from "./company/ports/services/password-hash";

const diContainer = new Container();

diContainer.bind(CreateCompanyCommand).toSelf();
diContainer.bind(CreateUserService).to(PrismaCreateCompany);
diContainer.bind(VerifyDataService).to(ConcreteVerifyDataService);
diContainer.bind(PasswordHash).to(CryptoPasswordHash);
diContainer.bind(PlainCompany).to(ConcretePlainCompany);

export {diContainer};