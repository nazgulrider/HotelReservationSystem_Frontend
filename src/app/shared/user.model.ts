import { Address } from "./address.model";

export class User {
    public id: Number;
    public firstName: String;
    public lastName: String;
    public profileImgUrl: String;
    public email: String;
    public phone: Number;  
    public address: Address[];  
    public billing: Address[];
}