import { Address } from "./address.model";
import { Login } from "./login.model";

export class User {
    public id: number;
    public login: Login;
    public firstName: string;
    public lastName: string;
    public profileImgUrl: string;
    public email: string;
    public phone: number;  
    public address: Address[];  
    public billing: Address[];
}