import { Injectable } from "@angular/core";
import { UserService } from "./user.service";
import { HttpClient } from "@angular/common/http";
import { Reservation } from "./reservation.model";
import {  Observable } from "rxjs/Rx";


@Injectable()
export class ReservationService {

    constructor(private http: HttpClient){}

    getReservationForUserId(userId:number): Observable<Reservation[]>{
        return this.http.get('api/users/'+userId+'/reservations').map(
            (result:any)=>{                
                return result.content.map(content=>content.reservation);
            }
        )
    }

}