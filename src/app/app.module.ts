import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MyDateRangePickerModule } from "mydaterangepicker";




import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelDetailsComponent } from './hotel/hotel-details/hotel-details.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HotelService } from './hotel/hotel.service';
import { CookieService } from "ngx-cookie-service";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AuthService } from './shared/auth.service';
import { XhrInterceptor } from './interceptor';
import { HomeLoginComponent } from './home/home-login/home-login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AuthGuard } from './shared/auth-guard.service';
import { UserService } from './shared/user.service';
import { RoomListComponent } from './hotel/room-list/room-list.component';



const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent, children: [
    { path: 'login', component: HomeLoginComponent }
  ]},
  {path: 'hotels', component: HotelComponent, canActivate: [AuthGuard], children: [
    { path: ':id/detail', component: HotelDetailsComponent },
    { path: ':id/rooms', component: RoomListComponent }
  ]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelComponent,
    HotelDetailsComponent,
    HomeLoginComponent,
    NavbarComponent,
    RoomListComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbModule.forRoot(),
    MyDateRangePickerModule
  ],
  providers: [
    AuthGuard,
    HotelService,
    CookieService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
