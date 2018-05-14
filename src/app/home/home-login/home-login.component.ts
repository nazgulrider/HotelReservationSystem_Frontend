import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-login',
  templateUrl: './home-login.component.html',
  styleUrls: ['./home-login.component.scss']
})
export class HomeLoginComponent implements OnInit {

  @Output() close: EventEmitter<any> = new EventEmitter();

  error: any;

  credentials = { username: '', password: '' };

  constructor(private auth: AuthService, private http: HttpClient, private router: Router) { }

  ngOnInit() {
  }


  login() {
    this.auth.authenticate(this.credentials,
      () => { this.router.navigate(['hotels']) },
      () => { this.error = this.auth.error });

  }

  onCloseHandled() {
    this.error = null;
    this.router.navigate(['home']);
  }
}
