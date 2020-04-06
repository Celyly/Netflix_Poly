import { Component, OnInit } from "@angular/core";
import { CommunicationService } from "../communication.service";
import { EncryptionService } from "../encryption.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  public email: string;
  public password: string;

  public constructor(private communicationService: CommunicationService, private encryptionService: EncryptionService) { }

  public ngOnInit(): void {
  }

  public login(): void {
    // Encryption
    const encryptedData: string = this.encryptionService.encrypt(this.password);
    // console.log(encryptedData);
    // console.log(this.encryptionService.decrypt(encryptedData));

    this.communicationService.auth(this.email, encryptedData).subscribe((res: any) => {
        console.log(res);
        if (res !== -1) {
          if (this.email === "admin@netflixpoly.com") {
            // change permissions rights
            console.log("You have admins rights!");
          } else {
            // regular user
            console.log("You are a regular customer!");
          }
        }
    });
  }

}
