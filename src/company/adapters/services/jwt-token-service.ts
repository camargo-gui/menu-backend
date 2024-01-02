import { JwtAuthPayload } from "#/company/adapters/dto/jwt-auth-payload";
import { TokenService } from "#/company/ports/services/token-service";
import { injectable } from "inversify";
import { sign, verify } from "jsonwebtoken";

@injectable()
export class JwtTokenService extends TokenService { 

    private secretKey = process.env.SECRET_JWT ?? "";

    generate(id: number): string {
        const token = sign({ id }, this.secretKey);
        return token;
    }

    verify(token: string): JwtAuthPayload | undefined {
        try {
            const payload = verify(token, this.secretKey) as JwtAuthPayload;
            return payload;
        } catch {
            return undefined;
        }
    }
}
