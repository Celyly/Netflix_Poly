import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class EncryptionService {
  private KEY: number;
  private separator: string;

  public constructor() {
    this.KEY = 255;
    this.separator = "#";
   }

   // Encryption
  public encrypt(password: string): string {
    let encryptedData: string = "";
    for (let i: number = 0; i < password.length; i++) {
      encryptedData += `${this.charToASCII(password[i]) + this.KEY}`;
      if (i !== password.length - 1) {
        encryptedData += this.separator;
      }
    }

    return encryptedData;
  }

  public decrypt(encryptedString: string): string {
    const letters: string[] = encryptedString.split(this.separator);
    let password: string = "";
    for (const letter of letters) {
      password +=  String.fromCharCode(parseInt(letter, 10) - this.KEY);
    }

    return password;
  }

  public charToASCII(myString: string): number {
    return myString.charCodeAt(0);
  }
}
