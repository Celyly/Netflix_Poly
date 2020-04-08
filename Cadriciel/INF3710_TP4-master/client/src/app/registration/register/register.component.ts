import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { sha256 } from "js-sha256";
import { CommunicationService } from "src/app/communication.service";
import { LoggedUser } from "src/app/logged-user";
import { RegisterMemberService } from "src/app/register-member.service";
import { Member } from "../../../../../common/Member";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  public fName: string;
  public lName: string;
  public member: Member;

  public exist: boolean;

  public loggedUser: LoggedUser;

  public constructor(private communicationService: CommunicationService, public router: Router,
                     public registerMemberService: RegisterMemberService) {
    this.exist = false;
    this.member = {
      id: "",
      name: "",
      password: "",
      email: "",
      zip: "",
      creditCard: null
    };
   }

  public ngOnInit(): void {}

  // Verify if User already exists
  public findDuplicate(): void {
    this.communicationService.memberCreated(this.member.email).subscribe((res: any) => {
      if (res !== 0) {
        this.exist = true;
      } else {
        this.exist = false;
        this.sendMember();
      }
    });
  }

  public sendMember(): void {
    if (this.verifyInputs()) {
      const encrypted: string = sha256(this.member.password);
      this.member.password = encrypted;
      this.member.name = this.fName + " " + this.lName;
      this.registerMemberService.createMember(this.member);
      this.router.navigate(["/register/payment"]);
    }
  }

  public verifyInputs(): boolean {
    if (this.fName === "" || this.lName === "" || this.member.password === "" || this.member.zip === "") {
      alert("Oops. You missed some required information. Please complete all the fields and try again.");

      return false;
    }

    return true;
  }

}
