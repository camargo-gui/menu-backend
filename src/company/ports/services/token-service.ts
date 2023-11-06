import { injectable } from "inversify";
import { JwtPayload } from "jsonwebtoken";

@injectable()
export abstract class TokenService {
  abstract generate(id: number): string;

  abstract verify(token: string): JwtPayload | undefined;
}
