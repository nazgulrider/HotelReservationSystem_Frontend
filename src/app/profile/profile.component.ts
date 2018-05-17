import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';
import { Reservation } from '../shared/reservation.model';
import { ReservationService } from '../shared/reservation.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  private user: User;
  reservations: Reservation[] = [];


  constructor(private userService: UserService,
    private reservationService: ReservationService,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.initializeUser();
  }

  
  initializeUser(){
    this.http.get('api/auth').subscribe(response => {

      if (response['name']) {
        this.userService.getUserByUsername(response['name']);
        this.user = this.userService.loggedInUser;

        this.fetchReservtions();

      }
    },
      (error) => console.log(error)
    )
  }

  fetchReservtions(){
    this.reservationService.getReservationForUserId(this.user.id).subscribe(
      (reservations: Reservation[]) => {
        this.reservations = reservations;
      },
      (error) => console.log(error)
    )
  }

}
