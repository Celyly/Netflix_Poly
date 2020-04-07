import { Component, OnInit } from "@angular/core";
import { LoggedUser } from "../logged-user";
import { LoggedUserService } from "../logged-user.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit {
  public loggedUser: LoggedUser;

  public constructor(public loggedService: LoggedUserService) {
    this.loggedService.loggedUser.subscribe((user) => this.loggedUser = user);
   }

  public ngOnInit(): void {
    console.log(this.loggedUser);
  }

}
