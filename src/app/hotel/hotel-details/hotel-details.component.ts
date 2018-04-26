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


  constructor() { }

  ngOnInit() {
  }


  onCloseHandled() {
    this.close.emit();
  }

}
