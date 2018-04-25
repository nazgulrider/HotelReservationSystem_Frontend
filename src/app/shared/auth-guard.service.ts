import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router:Router) {
        
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
        if (state.url !=='/home' && !this.auth.isAuthenticated()){
            this.router.navigate(['home']);
            return false;
        }
        return true;
    }
}