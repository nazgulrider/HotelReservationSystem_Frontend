import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class UserService {
    constructor(private http: HttpClient){

    }


    getUser(username: String): Observable<User> {
        return this.http.get('/api/users/'+username)
            .map((result: any) => {
                return result.content.map(content => content.user)
            })
    }
}