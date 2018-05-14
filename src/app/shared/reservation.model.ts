import { User } from "./user.model";
import { Hotel } from "../hotel/hotel.model";
import { Room } from "./room.model";

export class Reservation {
    public id: number;
    public created: Date;
    public checkIn: number;
    public checkOut: number;
    public paid: boolean;
    public user: User;
    public hotel: Hotel;
    public rooms: Room[];

    public constructor(checkIn:number, checkOut:number, paid:boolean, user:User, hotel:Hotel, rooms:Room[]){
        this.checkIn = checkIn;
        this.checkOut = checkOut;
        this.paid = paid;
        this.user = user;
        this.hotel = hotel;
        this.rooms = rooms;
    }
}