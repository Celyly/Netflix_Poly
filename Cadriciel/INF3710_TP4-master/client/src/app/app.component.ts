import { Location } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Hotel } from "../../../common/tables/Hotel";
import { CommunicationService } from "./communication.service";
import { LoggedUser } from "./logged-user";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
    public route: string;
    public loggedUser: LoggedUser;

    public constructor(private communicationService: CommunicationService, location: Location, router: Router) {
        router.events.subscribe(() => {
            (location.path() !== "") ? this.route = location.path() : this.route = "";
          });
        this.loggedUser = new LoggedUser();
        this.loggedUser.role = "ADMIN";
    }

    public readonly title: string = "INF3710 TP5";
    public hotels: Hotel[] = [];
    public ngOnInit(): void {
        this.communicationService.listen().subscribe((m:any) => {
            console.log(m);
            // this.getHotels();
        });
    }

    // public getHotels(): void {
    //     this.communicationService.getHotels().subscribe((hotels: Hotel[]) => {
    //         this.hotels = hotels;
    //     });
    // }

    // public deleteHotel(): void {
    //     // TODO
    // }

    public createDB(): void {
        this.communicationService.setUpDatabase().subscribe((res: any) => {
            console.log(res);
        });
    }
}