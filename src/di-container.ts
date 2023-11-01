import { Container } from "inversify";
import { OnboardingCommand } from "company/ports/commands/create-company-command";
import { CreateUserService } from "company/ports/services/create-user-service";
import { VerifyDataService } from "company/ports/services/verify-data-service";
import { ConcreteVerifyDataService } from "company/adapters/services/concrete-verify-data-service";
import { PrismaCreateCompany } from "company/adapters/services/prisma-create-company";

const diContainer = new Container();

diContainer.bind(OnboardingCommand).toSelf();
diContainer.bind(CreateUserService).to(PrismaCreateCompany);
diContainer.bind(VerifyDataService).to(ConcreteVerifyDataService);

export {diContainer}