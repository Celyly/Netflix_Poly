import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AdminComponent } from "./admin/admin.component";
import { AppComponent } from "./app.component";
import { AdminAuthGuardService } from "./auth-guard/admin-auth-guard.service";
// import { AuthGuardService } from "./auth-guard/auth-guard.service";
// import { HotelComponent } from "./hotel/hotel.component";
import { LoginComponent } from "./login/login.component";
import { MemberComponent } from "./member/member.component";
import { RegisterPaymentComponent } from "./registration/register-payment/register-payment.component";
import { RegisterPlanComponent } from "./registration/register-plan/register-plan.component";
import { RegisterComponent } from "./registration/register/register.component";
// import { RoomComponent } from "./room/room.component";

const routes: Routes = [
  { path: "app", component: AppComponent },
  // { path: "room", component: RoomComponent },
  // { path: "hotel", component: HotelComponent },
  { path: "login", component: LoginComponent },
  { path: "member", component: MemberComponent },
  // { path: "member", canActivate: [AuthGuardService], component: MemberComponent },
  { path: "admin", canActivate: [AdminAuthGuardService], component: AdminComponent,  },
  {
    path: "register",
    canActivate: [AdminAuthGuardService],
    children: [
      { path: "", redirectTo: "/register/plan", pathMatch: "full", canActivate: [AdminAuthGuardService] },
      { path: "plan", component: RegisterPlanComponent },
      { path: "account", component: RegisterComponent },
      { path: "payment", component: RegisterPaymentComponent }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
