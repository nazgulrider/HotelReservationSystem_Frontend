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

  authenticated: boolean=false; 

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) { 
    this.authenticated = this.auth.authenticated;
  }

  ngOnInit() {
  }


  logout() {
    this.http.post('/api/logout', {}).finally(() => {
      this.auth.authenticated = false;
      this.router.navigateByUrl('/home');
    }).subscribe();

  }
}
