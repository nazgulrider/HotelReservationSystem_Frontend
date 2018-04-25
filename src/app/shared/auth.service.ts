import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Injectable()
export class AuthService {

   
    constructor(private http: HttpClient, private authCookie: CookieService, private router:Router) {       
    }
    authenticate(credentials, callback) {

        const headers = new HttpHeaders(credentials ? {
            authorization: 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});

        this.http.get('api/auth', { headers: headers }).subscribe(response => {
            console.log(response);
            if (response['name']) {
                this.authCookie.set('authenticated', 'true')
            } 
            return callback && callback();
        });

    }

    isAuthenticated(){
        return this.authCookie.get('authenticated') === 'true';
    }

    logout(){
        this.http.post('/api/logout', {}).finally(() => {
            this.authCookie.set('authenticated','false');
            this.router.navigate(['home']);
        }).subscribe();
    }
}