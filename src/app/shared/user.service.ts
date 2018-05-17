import { Injectable, OnInit } from "@angular/core";
import { Observable, Subscription, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";


@Injectable()
export class UserService {

    public loggedInUser: User;

    imgUrl: string = '../../assets/images/profile.png';

    imgUrlSubject = new BehaviorSubject<string>(this.imgUrl);

    constructor(private http: HttpClient, private cookieService: CookieService) {

    }

    getUserProfileImageUrlObservable(): Observable<string> {
        return this.imgUrlSubject.asObservable();
    }

    /**
     * fetches user by its username
     * updates the variable loggedInUser with the fetched user
     * updates the image url for navigation bar profile picture
     * @param username username 
     * 
     */
    getUserByUsername(username: String) {
        return this.http.get('/api/users/user/' + username).subscribe((result: any) => {
            this.updateProfileImageUrl(result.user.profileImgUrl);
           
            this.loggedInUser = result.user;

            return result.user;
        },
            (error) => {
                console.log(error);
            }
        )
    }
    updateProfileImageUrl(profileImageUrl:string){
        this.imgUrlSubject.next(profileImageUrl);

    }

    getLoggedInUser() :User {
        return this.loggedInUser;
    }


}