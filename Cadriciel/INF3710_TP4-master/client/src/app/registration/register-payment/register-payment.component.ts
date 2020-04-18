import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { CommunicationService } from "src/app/communication.service";
import { LoggedUser } from "src/app/logged-user";
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

  public loggedUser: LoggedUser;
  public exist: boolean;

  // tslint:disable-next-line: max-line-length
  public constructor(private communicationService: CommunicationService, public registerMemberService: RegisterMemberService, public router: Router) {
    this.expiration = ["", "", ""];
    this.cardNumber = ["", "", "", ""];
    this.creditCard = {
      cardNo: "",
      ccv: "",
      ownerCard: "",
      expirationDate: "",
    };
    this.registerMemberService.plan.subscribe((plan: string) => this.plan = plan);
    this.registerMemberService.member.subscribe((member: Member) => this.member = member);
    this.exist = false;
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
      if (this.verifyInputs()) {
        this.communicationService.insertMember(this.plan, this.member).subscribe((res: any) => {
          if (res !== -1) {
            this.goToAdmin();
          } else {
            alert("An unexpected error was found! Please verify your inputs and try again");
          }
        });
      }
    });
  }

  public goToAdmin(): void {
    this.router.navigate(["/admin"], { state: { role: "ADMIN" } });
  }

  public verifyInputs(): boolean {
    const validCreditCard: string = this.cardNumber[0] + this.cardNumber[1]
                            + this.cardNumber[2] + this.cardNumber[3];
    console.log(this.fName, this.lName, this.creditCard.ccv, validCreditCard);
    if (this.fName === "" || this.lName === "" || this.creditCard.ccv.length < 3 || validCreditCard.length < 16) {
      alert("Oops. You missed some required information. Please complete all the fields and try again.");

      return false;
    }

    return true;
  }

  public isNumber(event: KeyboardEvent): boolean {
    const numbers: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    return numbers.includes(event.key);
  }

}
