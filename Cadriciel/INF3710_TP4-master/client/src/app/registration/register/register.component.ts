import { Component, OnInit } from "@angular/core";
import { sha256 } from "js-sha256";
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

  public loggedUser: LoggedUser;

  public constructor(public registerMemberService: RegisterMemberService) {
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

  public sendMember(): void {
    const encrypted: string = sha256(this.member.password);
    this.member.name = this.fName + " " + this.lName;
    this.member.password = encrypted;
    this.registerMemberService.createMember(this.member);
  }

}
