import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelComponent } from './hotel/hotel.component';
import { HotelListComponent } from './hotel/hotel-list/hotel-list.component';
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


const appRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'home'},
  {path: 'home', component: HomeComponent},
  {path: 'hotels', component: HotelComponent, canActivate: [AuthGuard]}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelComponent,
    HotelListComponent,
    HotelDetailsComponent,
    HomeLoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    AuthGuard,
    HotelService,
    CookieService,
    AuthService,
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
