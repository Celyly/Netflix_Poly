import { Component, OnInit } from '@angular/core';
import { Navigation, Router } from '@angular/router';

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements OnInit {
  public time: number;
  public navigation: Navigation;
  public url: string;

  public constructor(public router: Router) {
    this.navigation = this.router.getCurrentNavigation() as Navigation;
    this.time = 1;
    this.getTime();
    this.url = this.getUrl();
   }

  public ngOnInit(): void {
  }

  public getTime(): void {
    if (this.navigation) {
      const data = this.navigation.extras.state;
      if (data) {
        this.time = data.time;
        console.log(this.time);
        if (this.time !== 0) {
          this.time = 1200;
        } else {
          this.time = 1;
        }
      }
    }
  }

  public getUrl(): string {
    return `https://www.youtube.com/embed/UwsrzCVZAb8?controls=0&autoplay=1&start=${this.time}`;
  }

}
