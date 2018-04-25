import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  authenticated:boolean=true;

  constructor(){
  }


}
