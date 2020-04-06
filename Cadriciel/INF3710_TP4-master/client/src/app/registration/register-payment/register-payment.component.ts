import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "src/app/communication.service";
import { RegisterMemberService } from "src/app/register-member.service";
import { CreditCard } from "../../../../../common/CreditCard";
import { Member } from "../../../../../common/Member";

@Component({
  selector: "app-register-payment",
  templateUrl: "./register-payment.component.html",
  styleUrls: ["./register-payment.component.css"]
})
export class RegisterPaymentComponent implements OnInit {
  public plan: string;
  public member: Member;
  public fName: string;
  public lName: string;
  public expiration: string[];
  public cardNumber: string[];
  public creditCard: CreditCard;

  public constructor(private communicationService: CommunicationService, public registerMemberService: RegisterMemberService) {
    this.expiration = ["", "", ""];
    this.cardNumber = ["", "", "", ""];
    this.creditCard = {
      cardNo: "",
      ccv: 0,
      ownerCard: "",
      expirationDate: "",
    };
    this.registerMemberService.plan.subscribe((plan: string) => this.plan = plan);
    this.registerMemberService.member.subscribe((member: Member) => this.member = member);
  }

  public ngOnInit(): void {
    console.log(this.plan);
    console.log(this.member);
  }

  public finish(): void {
    this.creditCard.ownerCard = this.fName + " " + this.lName;
    this.creditCard.cardNo = this.cardNumber[0] + "-" + this.cardNumber[1] + "-" + this.cardNumber[2] + "-" + this.cardNumber[3];
    this.creditCard.expirationDate = this.expiration[0] + "-" + this.expiration[1] + "-" + this.expiration[2];
    this.member.creditCard = this.creditCard;

    this.communicationService.getNbMember().subscribe((res: any) => {
      const id: string = `${+res + 1}`;
      this.member.id = id;
      this.communicationService.insertMember(this.plan, this.member).subscribe((res: any) => {
        console.log(res);
      });
    });
  }

}
