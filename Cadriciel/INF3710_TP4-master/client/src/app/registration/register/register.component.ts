import { Component, OnInit } from "@angular/core";
import { RegisterMemberService } from "src/app/register-member.service";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  plan: string;
  public constructor(public registerMemberService: RegisterMemberService) {
    this.registerMemberService.plan.subscribe((plan) => this.plan = plan);
   }

  public ngOnInit(): void {
    console.log(this.plan);
  }

}
