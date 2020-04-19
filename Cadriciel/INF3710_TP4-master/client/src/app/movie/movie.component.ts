import { AfterViewInit, Component, HostListener, ViewChild } from "@angular/core";
import { Navigation, Router } from "@angular/router";
import { Member } from "../../../../common/Member";
import { Movie } from "../../../../common/Movie";
import { CommunicationService } from "../communication.service";

@Component({
  selector: "app-movie",
  templateUrl: "./movie.component.html",
  styleUrls: ["./movie.component.css"]
})
export class MovieComponent implements AfterViewInit {
  @ViewChild("video") public video: any;
  public movie: Movie;
  public member: Member;
  public time: number;
  public navigation: Navigation;
  public isContinuing: boolean;

  public constructor(public router: Router, public communicationService: CommunicationService) {
    this.navigation = this.router.getCurrentNavigation() as Navigation;
    this.time = 0;
    this.isContinuing = false;
    this.init();
   }

  public ngAfterViewInit(): void {
    this.startTime();
  }

  public init(): void {
    if (this.navigation) {
      const data = this.navigation.extras.state;
      if (data) {
        const factor: number = 60;
        this.time = data.time * factor;
        this.movie = data.movie;
        this.member = data.member;
        if (this.time !== 0) {
          this.isContinuing = true;
        }
      }
    }
  }

  public startTime(): void {
    if (this.navigation) {
      const data = this.navigation.extras.state;
      if (data) {
        if (this.isContinuing) {
          setTimeout(() => {
            this.video.nativeElement.currentTime = this.time;
          }, 0);
        }
      }
    }
  }

  @HostListener("window:mousedown", ["$event"])
  public saveTimeStamp(): void {
    const factor: number = 60;
    this.time = this.video.nativeElement.currentTime / factor;
    if (this.isContinuing) {
      this.communicationService.updateWatchtime(this.movie.movieno, this.member.id, this.time).subscribe((res) => {
        console.log("Timestamp saved!");
      });
    } else {
      this.communicationService.addWatchtime(this.movie.movieno, this.member.id, this.time).subscribe((res) => {
        this.isContinuing = true;
      });
    }
  }

}
