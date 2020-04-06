import { Component, OnInit } from "@angular/core";
import { EncryptionService } from "src/app/encryption.service";
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

  public constructor(public registerMemberService: RegisterMemberService, private encryptionService: EncryptionService) {
    this.member = {
      id: "",
      name: "",
      password: "",
      email: "",
      zip: "",
      creditCard: null
    };
   }

  public ngOnInit(): void {
  }

  public sendMember(): void {
    const encrypted: string = this.encryptionService.encrypt(this.member.password);
    this.member.name = this.fName + " " + this.lName;
    this.member.password = encrypted;
    this.registerMemberService.createMember(this.member);
  }

}
