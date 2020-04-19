// tslint:disable: no-floating-promises
// tslint:disable: no-any
import { Component } from "@angular/core";
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
export class LoginComponent {
  public email: string;
  public password: string;
  public isWrong: boolean;

  public loggedUser: LoggedUser;

  public constructor(private communicationService: CommunicationService, public router: Router, public loggedService: LoggedUserService) {
    this.loggedService.loggedUser.subscribe((user) => this.loggedUser = user);
    this.isWrong = false;
  }

  public login(): void {
    // Encryption
    const encryptedData: string = sha256(this.password);
    this.communicationService.auth(this.email, encryptedData).subscribe((res: any) => {
      this.changePermissions(res);
    });

  }

  public changePermissions(res: any): void {
    if (res !== -1) {
      this.isWrong = false;
      const member: Member = {
        id: res[0].idmembre,
        name: res[0].nommembre,
        password: res[0].motdepasse,
        email: res[0].adressecourriel,
        zip: res[0].adressepostale,
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
    } else {
      this.isWrong = true;
    }
  }

  public createDB(): void {
    this.communicationService.setUpDatabase().subscribe((res: any) => {
        console.log(res);
    });
}

}
