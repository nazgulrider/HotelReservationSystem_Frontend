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

  onDateRangeChanged(event: IMyDateRangeModel) {
    console.log('jsdate: ' + event.beginEpoc + " - " + event.endJsDate);

    this.hotelService.selectedCheckinDate = event.beginEpoc;
    this.hotelService.selectedCheckoutDate = event.endEpoc;

    this.hotelService.filteredRooms = this.hotelService.rooms.filter(
      room => room.reservations.length === 0 
      //  || room.reservations.filter(reservation=>{
      //     !(reservation.checkIn >= event.beginEpoc && reservation.checkIn <= event.endEpoc)
      //       && !(reservation.checkIn >= event.beginEpoc && reservation.checkIn <= event.endEpoc)
      // })


    );

    // this.hotelService.filteredRooms = this.hotelService.rooms.filter(room =>
    //   room.reservation === null || !(event.beginEpoc >= room.reservation.checkIn && event.beginEpoc <= room.reservation.checkOut)
    //    && !(room.reservation.checkIn >= event.beginEpoc && room.reservation.checkIn <= event.endEpoc)         
    //  )
    console.log(this.hotelService.filteredRooms);
  }

  filter(room: Room, event: any) {

    let answer= room.reservations.map(reservation => {
      if (
        !(event.beginEpoc >= reservation.checkIn && event.beginEpoc <= reservation.checkOut)
        && !(reservation.checkIn >= event.beginEpoc && reservation.checkIn <= event.endEpoc)
      ) {
        return false;
      }
      return true;
    }

    )

    console.log(answer)

  }




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
