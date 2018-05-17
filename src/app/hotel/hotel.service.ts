import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Hotel } from "./hotel.model";
import "rxjs/Rx";
import { BehaviorSubject, Observable } from "rxjs/Rx";
import { Room } from "../shared/room.model";

@Injectable()
export class HotelService {

    public hotels: Hotel[] = [];
    public rooms: Room[] = [];
    filteredRooms: Room[] = [];
    selectedHotel: Hotel;
    selectedCheckinDate: number;
    selectedCheckoutDate: number;

    constructor(private http: HttpClient) { }

    getHotels(): Observable<Hotel[]> {
        return this.http.get('/api/hotels').map(
            (result: any) => {
                return result.content.map(content => content.hotel)
            }
        )
    }

    getRooms(hotelId: Number): Observable<Room[]> {
        return this.http.get('/api/hotels/' + hotelId + '/rooms').map(
            (result: any) => {
                return result.content.map(content => content.room)
            }
        )
    }
}
