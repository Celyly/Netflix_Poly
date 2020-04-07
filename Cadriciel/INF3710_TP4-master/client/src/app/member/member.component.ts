import { Component, OnInit } from "@angular/core";
import { Movie } from "../../../../common/Movie";
import { CommunicationService } from "../communication.service";
import { LoggedUser } from "../logged-user";
import { LoggedUserService } from "../logged-user.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent implements OnInit {
  public loggedUser: LoggedUser;
  public movies: Movie[];

  public selectedOption: string;
  public movie: Movie;

  public watchtime: number;
  public duration: number;

  public constructor(public communicationService: CommunicationService, public loggedService: LoggedUserService) {
    this.loggedService.loggedUser.subscribe((user) => this.loggedUser = user);
    this.watchtime = 0;
    this.duration = 0;
    this.movie = { movieno: 0, title: "", genre: "", productiondate: "", duration: 0 };
  }

  public ngOnInit(): void {
    this.getMovies();
  }

  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }

  public getMovie(title: string): void {
    this.communicationService.getMovie(title).subscribe((movie: Movie) => {
      this.movie = movie;
    })
  }

  public getWatchtime(title: string, memberName: string): void {
    this.communicationService.getWatchtime(title, memberName).subscribe((watchtime: any) => {
      watchtime ? this.watchtime = watchtime.duration : this.watchtime = 0;
    });
  }

  public getDuration(title: string): void {
    this.communicationService.getMovieDuration(title).subscribe((duration: number) => {
      this.duration = duration;
    });
  }

  public isContinuing(): boolean {
    return this.watchtime > 0 && this.watchtime < this.duration;
  }

  public getCurrentMemberName(): string {
    if (this.loggedUser.member) {
      return this.loggedUser.member.name;
    }

    return "";
  }

  public test(): void {
    console.log(this.selectedOption[0]);
    this.getMovie(this.selectedOption[0]);
    this.getDuration(this.selectedOption[0]);
    this.getWatchtime(this.selectedOption[0], this.getCurrentMemberName());

  }
}
