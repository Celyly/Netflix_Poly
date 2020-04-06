import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { sha256 } from "js-sha256";
import { Member } from "../../../../common/Member";
import { CommunicationService } from "../communication.service";
import { LoggedUser } from "../logged-user";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  public loggedUser: LoggedUser;

  public constructor(private communicationService: CommunicationService, public router: Router) {
    this.loggedUser = new LoggedUser();
  }

  public ngOnInit(): void {}

  // tslint:disable-next-line: max-func-body-length
  public login(): void {
    // Encryption
    const encryptedData: string = sha256(this.password);
    this.communicationService.auth(this.email, encryptedData).subscribe((res: any) => {
      this.changePermissions(res);
    });

  }

  public changePermissions(res: any): void {
    if (res !== -1) {
      const member: Member = {
        id: res.memberId,
        name: res.memberName,
        password: res.memberPassword,
        email: res.email,
        zip: res.deliveryAddress,
        creditCard: null
      };
      if (this.email === "admin@netflixpoly.com") {
        console.log("You have admins rights!");
        this.loggedUser.role = "ADMIN";
        this.loggedUser.member = member;
        this.router.navigate(["/admin"], { state: { role: "ADMIN" } });
      } else {
        console.log("You are a regular customer!");
        this.loggedUser.role = "USER";
        this.loggedUser.member = member;
        this.router.navigate(["/member"], { state: { role: "MEMBER" } });
      }
    }
  }

}
