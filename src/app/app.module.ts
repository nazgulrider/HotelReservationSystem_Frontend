import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HotelListComponent } from './hotel-list/hotel-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HotelListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
