import { Component, OnInit } from '@angular/core';
import { HotelService } from './hotel.service';
import { Hotel } from './hotel.model';
import { CookieService } from 'ngx-cookie-service';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';




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

  selectedHotel: Hotel;
  

  constructor(private hotelService: HotelService) { }

  ngOnInit() {
    if(this.hotels.length===0){
      this.hotelService.getHotels().subscribe(
        (hotels: Hotel[]) => {
          this.hotels = hotels //takes result and extracts hotel objects from it
          console.log(this.hotels);
        },
        (error) => console.log(error)
      )
    }    
  }

  select(hotel:Hotel){
    this.selectedHotel = hotel;
  }

  onClose(){
    this.selectedHotel = null;
  }


}
