import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { RouterStateSnapshot } from '@angular/router';
import { User } from '../shared/user.model';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private userProfileImgUrl: Observable<string>;
  
  constructor(public auth: AuthService, private userService: UserService) { 
    this.userProfileImgUrl = userService.getUserProfileImageUrlObservable();
  }

  ngOnInit() {
  }
 

  logout() {
    this.auth.logout();
  }
}
