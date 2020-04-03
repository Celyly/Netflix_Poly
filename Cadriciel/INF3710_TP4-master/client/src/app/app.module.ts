import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AdminComponent } from "./admin/admin.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { HotelComponent } from "./hotel/hotel.component";
import { LoginComponent } from "./login/login.component";
import { MemberComponent } from "./member/member.component";
import { RoomComponent } from "./room/room.component";

@NgModule({
  declarations: [
    AppComponent,
    RoomComponent,
    HotelComponent,
    AdminComponent,
    MemberComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [CommunicationService],
  bootstrap: [AppComponent],
})
export class AppModule { }
