import { Component, OnInit } from '@angular/core';
import { HotelService } from './hotel.service';
import { Hotel } from './hotel.model';
import { CookieService } from 'ngx-cookie-service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';
import { Room } from '../shared/room.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [

        query(':enter', style({ opacity: 0 }), { optional: true }),

        query(':enter', stagger('300ms', [
          animate('1s ease-in', keyframes([
            style({ opacity: 0, transform: 'translateY(-75%)', offset: 0 }),
            style({ opacity: .5, transform: 'translateY(35px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateY(0)', offset: 1.0 }),
          ]))]), { optional: true })
      ])
    ])

  ]
})
export class HotelComponent implements OnInit {

  hotels: Hotel[] = [];
  links: any[] = [];
  rooms: Room[] = [];

  selectedHotel: Hotel;
  

  constructor(private hotelService: HotelService, private route: Router) { }

  ngOnInit() {

    //check to see whether already fetched hotels exist
    if(this.hotelService.hotels.length === 0){
      this.hotelService.getHotels().subscribe(
        (hotels: Hotel[]) => {

          //assign hotels from fetched data to service 
          this.hotelService.hotels = hotels;

          this.hotels = this.hotelService.hotels;

          console.log(this.hotels);
        },
        (error) => console.log(error)
      )
    } 
    else {
      this.hotels = this.hotelService.hotels;
    }   
  }


  select(hotel:Hotel){
    this.hotelService.selectedHotel = hotel;
    this.route.navigate(['hotels/'+hotel.id+'/detail']);    
  }

  onClose(){
    this.selectedHotel = null;
  }

}
