import { Reservation } from "./reservation.model";
import { Hotel } from "../hotel/hotel.model";

export class Room {
    public id: number;
    public roomNumber: number;
    public type: string;
    public price: number;
    public available: boolean;
    public reservations: Reservation[];   
}