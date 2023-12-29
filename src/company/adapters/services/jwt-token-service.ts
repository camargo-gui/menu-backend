import { TokenService } from "#/company/ports/services/token-service";
import { injectable } from "inversify";
import { JwtPayload, sign, verify } from "jsonwebtoken";

@injectable()
export class JwtTokenService extends TokenService {
    generate(id: number): string {
        const token = sign({ id }, process.env.SECRET_JWT!);
        return token;
    }

    verify(token: string): JwtPayload | undefined {
        try {
            const payload = verify(token, process.env.SECRET_JWT!) as JwtPayload;
            return payload;
        } catch {
            return undefined;
        }
    }
}
