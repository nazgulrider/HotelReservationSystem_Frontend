import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { UserService } from './shared/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private auth: AuthService, private userService:UserService){}

}
