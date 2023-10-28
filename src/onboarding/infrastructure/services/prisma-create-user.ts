import { prismaClient } from "client/prisma-client";
import { injectable } from "inversify";
import { User } from "onboarding/domain/ entities/user";
import { OnboardingListeners } from "onboarding/domain/commands/onboarding-command";
import { CreateUserService } from "onboarding/domain/services/create-user-service";

@injectable()
export class PrismaCreateUser extends CreateUserService {
  async createUser(user: User): Promise<void> {
    await prismaClient.user.create({
      data: user,
    });
  }
}
