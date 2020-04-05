import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit{
  public email: string;
  public password: string;

  public constructor(private communicationService: CommunicationService) { }

  public ngOnInit(): void {
  }

  public login(): void {
    this.communicationService.login(this.email, this.password).subscribe((res: any) => {
        console.log(res);
    });
}

}
