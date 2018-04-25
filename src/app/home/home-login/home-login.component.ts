import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.scss']
})
export class HomeLoginComponent implements OnInit {


  credentials = { username: '', password: '' };

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }


  login() {
    this.auth.authenticate(this.credentials, () => {
      this.router.navigateByUrl('/hotels')
    });
    return false;
  }
}
