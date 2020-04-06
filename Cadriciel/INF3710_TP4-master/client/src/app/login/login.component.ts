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
    // this.communicationService.auth(this.email, this.password).subscribe((res: any) => {
    //     console.log(res);
    // });
    // this.encryptionService.encrypt(this.password);
    // Encryption
    const encryptedData: string = this.encryptionService.encrypt(this.password);
    this.communicationService.auth(this.email, encryptedData).subscribe((res: any) => {
        console.log(res);
    });
  }

}
