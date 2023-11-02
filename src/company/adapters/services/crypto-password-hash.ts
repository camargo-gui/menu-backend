import { PasswordHash } from "../../../company/ports/services/password-hash";
import { createHash, randomBytes } from "crypto";
import { injectable } from "inversify";


@injectable()
export class CryptoPasswordHash extends PasswordHash {
  create(password: string): string {
    const salt = randomBytes(16).toString("hex"); 
    const hash = createHash("sha256").update(password + salt).digest("hex"); 
    return `${salt}:${hash}`; 
  }
  compare(inputPassword: string, storedHash: string): boolean {
    const [salt, storedHashValue] = storedHash.split(":"); 
    const hash = createHash("sha256").update(inputPassword + salt).digest("hex"); 
    return hash === storedHashValue; 
  }

}