import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { LoggedUser } from "./logged-user";

@Injectable({
  providedIn: "root"
})
export class LoggedUserService {
  public loggedUser: BehaviorSubject<LoggedUser>;

  public constructor() {
    this.loggedUser = new BehaviorSubject<LoggedUser>(new LoggedUser());
  }

  public setLoggedUser(loggedUser: LoggedUser): void {
    this.loggedUser.next(loggedUser);
  }
}
