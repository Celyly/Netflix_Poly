import { Component, OnInit } from "@angular/core";
import { LoggedUser } from "../logged-user";
import { LoggedUserService } from "../logged-user.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent implements OnInit {
  public loggedUser: LoggedUser;

  public constructor(public loggedService: LoggedUserService) {
    this.loggedUser = new LoggedUser();
    this.loggedUser.role = "MEMBER";
    this.loggedService.setLoggedUser(this.loggedUser);
  }

  public ngOnInit(): void {
  }

}
