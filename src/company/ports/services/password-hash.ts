import { injectable } from "inversify";

@injectable()
export abstract class PasswordHash {

    abstract create(password:string):string;

    abstract compare(inputPassword: string, hashedPassword:string): boolean;
}