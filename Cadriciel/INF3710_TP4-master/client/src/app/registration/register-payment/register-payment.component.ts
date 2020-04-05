import { Component, OnInit } from "@angular/core";
import { RegisterMemberService } from "src/app/register-member.service";

@Component({
  selector: "app-register-payment",
  templateUrl: "./register-payment.component.html",
  styleUrls: ["./register-payment.component.css"]
})
export class RegisterPaymentComponent implements OnInit {
  public plan: string;

  public constructor(public registerMemberService: RegisterMemberService) {
    this.registerMemberService.plan.subscribe((plan: string) => this.plan = plan);
   }

  public ngOnInit(): void {
    console.log(this.plan);
  }

}
