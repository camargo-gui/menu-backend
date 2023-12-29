import { injectable } from "inversify";

export interface LoginDatabaseReturn {
  id: number;
  password: string;
}

@injectable()
export abstract class LoginService {
  abstract login(
    document: string,
    onInternalError: () => Promise<void>
  ): Promise<LoginDatabaseReturn | undefined>;
}
