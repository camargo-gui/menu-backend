import { Container } from "inversify";
import { OnboardingCommand } from "onboarding/ports/commands/onboarding-command";
import { CreateUserService } from "onboarding/ports/services/create-user-service";
import { VerifyDataService } from "onboarding/ports/services/verify-data-service";
import { ConcreteVerifyDataService } from "onboarding/adapters/services/concrete-verify-data-service";
import { PrismaCreateUser } from "onboarding/adapters/services/prisma-create-user";

const diContainer = new Container();

diContainer.bind(OnboardingCommand).toSelf();
diContainer.bind(CreateUserService).to(PrismaCreateUser);
diContainer.bind(VerifyDataService).to(ConcreteVerifyDataService);

export {diContainer}