import { diContainer } from "di-container";
import { OnboardingCommand } from "./domain/commands/onboarding-command";
import { CreateUserService } from "./domain/services/create-user-service";
import { PrismaCreateUser } from "./infrastructure/services/prisma-create-user";
import { VerifyDataService } from "./domain/services/verify-data-service";
import { ConcreteVerifyDataService } from "./infrastructure/services/concrete-verify-data-service";
import { OnboardingController } from "./infrastructure/controllers/onbording-controller";


diContainer.bind(OnboardingCommand).toSelf();
diContainer.bind(CreateUserService).to(PrismaCreateUser);
diContainer.bind(VerifyDataService).to(ConcreteVerifyDataService);
diContainer.bind(OnboardingController).toSelf();