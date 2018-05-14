import { Component, OnInit } from '@angular/core';
import { HotelService } from '../hotel.service';
import { Room } from '../../shared/room.model';
import { UserService } from '../../shared/user.service';
import { User } from '../../shared/user.model';
import { Reservation } from '../../shared/reservation.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { Hotel } from '../hotel.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-room-list',
  templateUrl: './room-list.component.html',
  styleUrls: ['./room-list.component.scss']
})
export class RoomListComponent implements OnInit {

  rooms: Room[] = [];
  cart: Room[] = [];

  constructor(private hotelService: HotelService,
    private router:Router,
    private http: HttpClient,
     private userService: UserService,
      private modalService: NgbModal) {
    this.rooms = hotelService.filteredRooms;
  }

  ngOnInit() {
    console.log(this.cart)
  }
 

  addToCart(event: any, room: Room) {
    if (event.target.checked) {
      this.cart.push(room);
      console.log(this.cart);
    }
    else if (!event.target.checked) {
      if (this.cart.includes(room)) {
        this.cart = this.cart.filter(content => content !== room);
        console.log(this.cart);
      }
    }
  }

  makeReservation(content){
    console.log("making reservation")

    //collected when first logged in
    const user:User = this.userService.loggedInUser;

    //collected when selected in hotel-details component
    const hotel:Hotel = this.hotelService.selectedHotel;

    //collected when selecting date in hotel-details component
    const checkIn = this.hotelService.selectedCheckinDate;
    const checkOut = this.hotelService.selectedCheckoutDate;

    let reservation:Reservation = new Reservation (checkIn,checkOut,false,user,hotel,this.cart);

    this.modalService.open(content).result.then(() => {
      console.log(`making post request to reservations for user ${user}`);
      this.http.post('/api/reservations', reservation).subscribe(
        (response)=> {
          console.log(response);
          this.router.navigate(['hotels']);
        },
        (error)=>{
          console.log(error);          
        }

      );

    }, () => {
      console.log(`Cancelled the reservation`);
    });
  }
}
