import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hotel } from '../hotel.model';
import { IMyDrpOptions, IMyDateRangeModel } from 'mydaterangepicker';
import { HotelService } from '../hotel.service';
import { Room } from '../../shared/room.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  @Input() hotel: Hotel;
  @Output() close: EventEmitter<any> = new EventEmitter();

  start: number;
  end: number;

  showDatePicker1: boolean = false;
  showDatePicker2: boolean = false;
  showDatePicker3: boolean = false;

  filteredRooms: Room[] = [];

  constructor(private hotelService: HotelService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.hotelService.getRooms(id).subscribe(
      (rooms: Room[]) => {
        this.hotelService.rooms = rooms;
        console.log("In hotel-details component initialization step getting rooms")
        console.log(rooms)
      },
      (error) => console.log(error)
    )
  }

  myDateRangePickerOptions: IMyDrpOptions = {
    dateFormat: 'dd/mm/yyyy',
    inline: true,
    indicateInvalidDateRange: true,
    markCurrentDay: true,
  };

  private model: string = null;

  onDateRangeChanged(event: IMyDateRangeModel, roomType: string) {
    console.log('jsdate: ' + event.beginEpoc + " - " + event.endJsDate);

    this.hotelService.selectedCheckinDate = event.beginEpoc;
    this.hotelService.selectedCheckoutDate = event.endEpoc;
       
    this.filterByDates(this.hotelService.rooms, event);
    this.hotelService.filteredRooms = this.filteredRooms.filter((room)=> room.type === roomType);

      
    console.log(this.hotelService.filteredRooms);
  }

  filterByDates(rooms: Room[], event: any) {
    // this.filteredRooms=[];
    let available = true;

    //check all rooms
    for (let i = 0; i < rooms.length; i++) {
      //if room has no reservation add to available rooms(filteredRooms)
      if (rooms[i].reservations.length === 0) {
        this.filteredRooms.push(rooms[i])
        
        //if room has reservations check all reservations
      } else {
        for (let j = 0; j < rooms[i].reservations.length; j++) {
          
          let checkIn = rooms[i].reservations[j].checkIn;
          let checkOut = rooms[i].reservations[j].checkOut;
          //if selected range falls within any one of the reservations set available to false and stop checking the rest
          if ((event.beginEpoc >= checkIn && event.beginEpoc <= checkOut) ||
            (event.endEpoc >= checkIn && event.endEpoc <= checkOut) ||
            (checkIn >= event.beginEpoc && checkIn <= event.endEpoc)
          ) {
            available=false;
            break;
          }         
          
        }
        //if loop is done and room was available add room to available rooms
        if (available) {
          this.filteredRooms.push(rooms[i]);
        }
      }
    }
  }



/**
 * navigates out of the child component that displays the room types
 * 
 */
  onCloseHandled() {
    this.router.navigate(['hotels']);
    this.showDatePicker1 = false;
    this.showDatePicker2 = false;
    this.showDatePicker3 = false;
  }

  onCheckAvailable(id: Number) {
    switch (id) {
      case 1:
        this.showDatePicker1 = true;
        break;
      case 2:
        this.showDatePicker2 = true;
        break;
      case 3:
        this.showDatePicker3 = true;
        break;

      default:
        break;
    }

  }

  findAvailableRooms(id: Number) {
    this.router.navigate(['hotels/' + id + '/rooms']);
  }

  //cancel the click event from propagating to the parent div which triggers close event on the window
  onCardClicked(e: Event) {
    if (e) {
      e.stopPropagation();
    }
    return false;
  }

}
