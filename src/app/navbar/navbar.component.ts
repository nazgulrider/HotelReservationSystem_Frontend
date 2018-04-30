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
  private user:User;
  
  constructor(public auth: AuthService) { 
  }

  ngOnInit() {
  }

 

  logout() {
    this.auth.logout();
  }
}
