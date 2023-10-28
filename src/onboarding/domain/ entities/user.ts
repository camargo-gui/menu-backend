import { userType } from "./userType";

export class User {

    public constructor(
        public full_name: string,
        public age: number,
        public username: string,
        public email: string,
        public phone: string,
        public password: string,
        public type: userType,
        public weight?: number,
        public height? : number,
    ){}

    public isInstructor (): boolean {
        return this.type === userType.instructor;
    }
}