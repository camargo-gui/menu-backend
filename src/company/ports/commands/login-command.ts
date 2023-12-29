import { noop } from "#/lib/noop";
import { inject, injectable } from "inversify";
import { LoginData } from "../dto/login-data";
import { LoginService } from "../services/login-service";
import { PasswordHash } from "../services/password-hash";
import { TokenService } from "../services/token-service";

export interface LoginListeners {
  onSuccess: () => Promise<void>;
  onIncorrectPassword: () => Promise<void>;
  onCompanyNotFound: () => Promise<void>;
  onInternalError: () => Promise<void>;
}

@injectable()
export class LoginCommand {
    public onSuccess: (token: string) => Promise<void> = noop;

    public onIncorrectPassword: () => Promise<void> = noop;

    public onCompanyNotFound: () => Promise<void> = noop;

    public onInternalError: () => Promise<void> = noop;

    constructor(
    @inject(LoginService) private readonly loginService: LoginService,
    @inject(PasswordHash) private readonly passwordHash: PasswordHash,
    @inject(TokenService) private readonly tokenService: TokenService
    ) {}

    async execute(data: LoginData) {
        const registredCompany = await this.loginService.login(
            data.document,
            this.onInternalError
        );
        if (registredCompany) {
            const isValid = this.passwordHash.compare(
                data.password,
                registredCompany.password
            );
            if (isValid) {
                const token = this.tokenService.generate(registredCompany.id);
                this.onSuccess(token);
            } else {
                this.onIncorrectPassword();
            }
        } else {
            this.onCompanyNotFound();
        }
    }
}
