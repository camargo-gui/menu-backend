import { prismaClient } from "client/prisma-client";
import { injectable } from "inversify";
import { User } from "onboarding/domain/ entities/user";
import { OnboardingListeners } from "onboarding/domain/commands/onboarding-command";
import { VerifyDataService } from "onboarding/domain/services/verify-data-service";
import { OnboardingErrorMessage } from "./messages/errorMessage";

@injectable()
export class ConcreteVerifyDataService extends VerifyDataService {
  async verifyPhone(
    phone: string,
    onUserAlreadyExists: (message: string) => void
  ): Promise<void> {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        phone: phone,
      },
    });

    if (existingUser) {
      onUserAlreadyExists(OnboardingErrorMessage.phoneAlreadyExists);
    }
  }

  async verifyEmail(
    email: string,
    onUserAlreadyExists: (message: string) => void
  ): Promise<void> {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      onUserAlreadyExists(OnboardingErrorMessage.emailAlreadyExists);
    }
  }

  async verifyUsername(
    username: string,
    onUserAlreadyExists: (message: string) => void
  ): Promise<void> {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      onUserAlreadyExists(OnboardingErrorMessage.usernameAlreadyExists);
    }
  }

  public async verifyData(
    user: User,
    onUserAlreadyExists: (message: string) => void
  ): Promise<void> {
    await this.verifyEmail(user.email, onUserAlreadyExists);
    await this.verifyPhone(user.phone, onUserAlreadyExists);
    await this.verifyUsername(user.username, onUserAlreadyExists);
  }
}
