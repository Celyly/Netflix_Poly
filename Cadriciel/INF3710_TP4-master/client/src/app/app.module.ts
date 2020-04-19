import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { AdminComponent } from "./admin/admin.component";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CommunicationService } from "./communication.service";
import { LoginComponent } from "./login/login.component";
import { MemberComponent } from "./member/member.component";
import { MovieComponent } from "./movie/movie.component";
import { RegisterPaymentComponent } from "./registration/register-payment/register-payment.component";
import { RegisterPlanComponent } from "./registration/register-plan/register-plan.component";
import { RegisterComponent } from "./registration/register/register.component";

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    MemberComponent,
    LoginComponent,
    RegisterComponent,
    RegisterPlanComponent,
    RegisterPaymentComponent,
    MovieComponent
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
