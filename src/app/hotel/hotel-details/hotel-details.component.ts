import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Hotel } from '../hotel.model';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss']
})
export class HotelDetailsComponent implements OnInit {

  @Input() hotel: Hotel; 
  @Output() close: EventEmitter<any> = new EventEmitter();

  showDatePicker1:boolean = false;
  showDatePicker2:boolean = false;
  showDatePicker3:boolean = false;

  constructor() { }

  ngOnInit() {
  }


  onCloseHandled() {
    this.close.emit();
    this.showDatePicker1=false;
    this.showDatePicker2=false;
    this.showDatePicker3=false;
  }

  onCheckAvailable(id:Number) {
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

  findAvailableRooms(id:Number){

  }
  
  //cancel the click event from propagating to the parent div which triggers close event on the window
  onCardClicked(e:Event){
    if (!e) var e = window.event;
    e.cancelBubble = true;

    if (e.stopPropagation) e.stopPropagation();
  }



}
