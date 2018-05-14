import { Injectable } from "@angular/core";
import { Observable, Subscription, BehaviorSubject } from "rxjs";
import { User } from "./user.model";
import { HttpClient } from "@angular/common/http";


@Injectable()
export class UserService {

    public loggedInUser:User;

    imgUrl: string = '../../assets/images/profile.png';

    imgUrlSubject = new BehaviorSubject<string>(this.imgUrl);

    constructor(private http: HttpClient){

    }

    getUserProfileImageUrlObservable() : Observable<string> {
        return this.imgUrlSubject.asObservable();
    }


    getUser(username: String):Subscription {
        return this.http.get('/api/users/user/'+username).subscribe((result:any) => {
            this.imgUrlSubject.next(result.user.profileImgUrl);

            console.log(result.user.profileImgUrl);

            this.loggedInUser = result.user;

            return result.user;
        },
        (error)=>{
            console.log(error);
        }
    )


            // .map((result: any) => {
            //     return result.user;
            // }).subscribe();
    }
}