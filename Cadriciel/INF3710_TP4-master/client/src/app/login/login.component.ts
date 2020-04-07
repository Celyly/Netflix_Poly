import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { sha256 } from "js-sha256";
import { Member } from "../../../../common/Member";
import { CommunicationService } from "../communication.service";
import { LoggedUser } from "../logged-user";
import { LoggedUserService } from "../logged-user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  public loggedUser: LoggedUser;

  public constructor(private communicationService: CommunicationService, public router: Router, public loggedService: LoggedUserService) {
    // this.loggedUser = new LoggedUser();
    this.loggedService.loggedUser.subscribe((user) => this.loggedUser = user);
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
        id: res[0].memberid,
        name: res[0].membername,
        password: res[0].memberpassword,
        email: res[0].email,
        zip: res[0].deliveryaddress,
        creditCard: null
      };
      if (this.email === "admin@netflixpoly.com") {
        console.log("You have admins rights!");
        this.loggedUser.role = "ADMIN";
        this.loggedUser.member = member;
        this.loggedService.setLoggedUser(this.loggedUser);
        this.router.navigate(["/admin"], { state: { role: "ADMIN" } });
      } else {
        console.log("You are a regular customer!");
        this.loggedUser.role = "MEMBER";
        this.loggedUser.member = member;
        this.loggedService.setLoggedUser(this.loggedUser);
        this.router.navigate(["/member"], { state: { role: "MEMBER" } });
      }
    }
  }

}
