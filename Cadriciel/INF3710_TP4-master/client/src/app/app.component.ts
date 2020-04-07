import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Hotel } from "../../../common/tables/Hotel";
import { CommunicationService } from "./communication.service";
import { LoggedUser } from "./logged-user";
import { LoggedUserService } from "./logged-user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;
    public loggedUser: LoggedUser;

    public constructor(private communicationService: CommunicationService, location: Location, public router: Router,
                       public loggedService: LoggedUserService) {
        router.events.subscribe(() => {
            (location.path() !== "") ? this.route = location.path() : this.route = "";
        });
        this.loggedService.loggedUser.subscribe((user) => this.loggedUser = user);
    }

    public readonly title: string = "INF3710 TP5";
    public hotels: Hotel[] = [];
    public ngOnInit(): void {
        this.communicationService.listen().subscribe((m: any) => {
            console.log(m);
            // this.getHotels();
        });
    }

    public goToHome(): void {
        if (this.loggedUser.role === "ADMIN") {
            this.goToAdmin();
        } else if (this.loggedUser.role === "MEMBER") {
            this.goToMember();
        } else {
            this.router.navigate(["/"]);
        }
    }

    public goToMember(): void {
        this.router.navigate(["/member"], { state: { role: "MEMBER" } });
    }

    public goToAdmin(): void {
        this.router.navigate(["/admin"], { state: { role: "ADMIN" } });
    }

    public goToRegister(): void {
        this.router.navigate(["/register"], { state: { role: "ADMIN" } });
    }

    public logout(): void {
        this.loggedUser.role = "GUEST";
        this.loggedService.setLoggedUser(this.loggedUser);
        this.router.navigate(["/"], { state: { role: "GUEST" } });
    }

    // public getHotels(): void {
    //     this.communicationService.getHotels().subscribe((hotels: Hotel[]) => {
    //         this.hotels = hotels;
    //     });
    // }

    // public deleteHotel(): void {
    //     // TODO
    // }

    // public createDB(): void {
    //     this.communicationService.setUpDatabase().subscribe((res: any) => {
    //         console.log(res);
    //     });
    // }
}
