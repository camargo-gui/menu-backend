import { prismaClient } from "client/prisma-client";
import { injectable } from "inversify";
import { User } from "create-user/ports/ entities/user";
import { VerifyDataService } from "create-user/ports/services/verify-data-service";
import { OnboardingErrorMessage } from "./messages/errorMessage";

@injectable()
export class ConcreteVerifyDataService extends VerifyDataService {
  async verifyPhone(phone: string): Promise<boolean> {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        phone: phone,
      },
    });

    if (existingUser) {
      return false;
    }

    return true;
  }

  async verifyEmail(email: string): Promise<boolean> {
    try {
      const existingUser = await prismaClient.user.findFirst({
        where: {
          email: email,
        },
      });
      if (existingUser) {
        return false;
      }
    } catch (e) {
      console.log(e);
    }

    return true;
  }

  async verifyUsername(username: string): Promise<boolean> {
    const existingUser = await prismaClient.user.findFirst({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      return false;
    }

    return true;
  }

  public async verifyData(user: User): Promise<boolean> {
    try {
      const isEmailValid = await this.verifyEmail(user.email);
      const isPhoneValid = await this.verifyPhone(user.phone);
      const isUsernameValid = await this.verifyUsername(user.username);
      return isEmailValid && isPhoneValid && isUsernameValid;
    } catch (e) {
      console.log(e);
    }
    return false;
  }
}
