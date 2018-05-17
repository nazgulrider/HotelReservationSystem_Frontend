import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { UserService } from "./user.service";

@Injectable()
export class AuthService {

    error:any;

    constructor(
        private http: HttpClient, 
        private authCookie: CookieService, 
        private router: Router, 
        private userService: UserService
    ) {}

    authenticate(credentials, callback, callback2) {

        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        this.http.get('api/auth', { headers: headers }).subscribe(response => {
            console.log(response);
            if (response['name']) {
                this.authCookie.set('authenticated', 'true', .2);
                
                this.userService.getUserByUsername(response['name']);
            }
            return callback && callback();
        },

            (error) => {
                this.error = error
                return callback2 && callback2();
            }
        );


    }

    isAuthenticated() {
        return this.authCookie.get('authenticated') === 'true';
    }

    logout() {
        this.http.post('/api/logout', {}).finally(() => {
            this.authCookie.set('authenticated', 'false');
            this.router.navigate(['home']);
        }).subscribe();
    }
}