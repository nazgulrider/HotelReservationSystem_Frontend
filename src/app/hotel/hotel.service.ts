import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Hotel } from "./hotel.model";
import "rxjs/Rx";
import { BehaviorSubject, Observable } from "rxjs/Rx";

@Injectable()
export class HotelService {

    private hotels = new BehaviorSubject<Hotel[]>([]);

    constructor(private http: HttpClient) {}

    getHotels():Observable<Hotel[]> {
        return this.http.get('/api/hotels')
        .map((result:any) => {
           return result.content.map(content => content.hotel)
        } )
    }

}