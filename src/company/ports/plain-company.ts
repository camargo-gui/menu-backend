import { injectable } from "inversify";
import { Company } from "./entities/company";

@injectable()
export abstract class PlainCompany {
    abstract execute(company:Company):Company;
}