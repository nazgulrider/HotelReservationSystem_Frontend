import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  
  constructor(private auth: AuthService, private http: HttpClient, private router: Router) { 
  }

  ngOnInit() {
  }


  logout() {
    this.auth.logout();
  }
}
