import { Address } from "./address.model";

export class User {
    public id: number;
    public firstName: string;
    public lastName: string;
    public profileImgUrl: string;
    public email: string;
    public phone: number;  
    public address: Address[];  
    public billing: Address[];
}