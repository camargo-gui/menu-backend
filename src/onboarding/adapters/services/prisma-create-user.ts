import { prismaClient } from "client/prisma-client";
import { injectable } from "inversify";
import { User } from "create-user/ports/ entities/user";
import { CreateUserService } from "create-user/ports/services/create-user-service";

@injectable()
export class PrismaCreateUser extends CreateUserService {
  async createUser(user: User, onInternalError: () => Promise<void>): Promise<void> {
    try {
      await prismaClient.user.create({
        data: user,
      });
    }catch(e){
      await onInternalError();
    }
  }
}
