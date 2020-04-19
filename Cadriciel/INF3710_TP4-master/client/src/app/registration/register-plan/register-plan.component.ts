import { Component, OnInit } from "@angular/core";
import { LoggedUser } from "src/app/logged-user";
import { RegisterMemberService } from "src/app/register-member.service";

@Component({
  selector: "app-register-plan",
  templateUrl: "./register-plan.component.html",
  styleUrls: ["./register-plan.component.css"]
})
export class RegisterPlanComponent {
  public loggedUser: LoggedUser;

  public constructor(public registerMemberService: RegisterMemberService) {
  }

  public sendPlan(name: string): void {
    this.registerMemberService.setPlan(name);
  }

}
