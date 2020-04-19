import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from "@angular/core";
import { Router } from "@angular/router";
import { Movie } from "../../../../common/Movie";
import { Oscar } from "../../../../common/Oscar";
import { Person } from "../../../../common/Person";
import { CommunicationService } from "../communication.service";
import { LoggedUser } from "../logged-user";
import { LoggedUserService } from "../logged-user.service";

@Component({
  selector: "app-member",
  templateUrl: "./member.component.html",
  styleUrls: ["./member.component.css"]
})
export class MemberComponent implements OnInit, AfterViewInit {
  @ViewChildren("popups") public popups: QueryList<ElementRef<HTMLElement>>;

  public popup: HTMLElement | null | undefined;

  public loggedUser: LoggedUser;
  public movies: Movie[];

  public selectedOption: string;
  public movie: Movie;

  public watchtime: number;
  public duration: number;
  public price: string;

  // Affichage
  public roles: string[];
  public crew: Person[];
  public awards: Oscar[];

  public map: Map<string, HTMLElement | null>;

  public constructor(public communicationService: CommunicationService, public loggedService: LoggedUserService,
                     public router: Router) {
    this.loggedService.loggedUser.subscribe((user) => this.loggedUser = user);
    this.watchtime = 0;
    this.duration = 0;
    this.movie = { movieno: 0, title: "", genre: "", productiondate: "", duration: 0, price: 0 };
    this.roles = [];
    this.crew = [];
    this.awards = [];
    this.map = new Map<string, HTMLElement>();
    this.popup = null;
    this.price = "N\'A";
  }

  public ngOnInit(): void {
    this.getMovies();
  }

  public ngAfterViewInit(): void {
    this.popups.changes.subscribe((comps: QueryList<ElementRef<HTMLElement>>) => {
        const movieArray: ElementRef<HTMLElement>[] = this.popups.toArray();
        if (movieArray.length) {
          for (let i: number = 0; i < this.movies.length; i++) {
            this.map.set(this.movies[i].title, movieArray[i].nativeElement);
          }
        }
     });
  }

  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }

  public getMovie(title: string): void {
    this.communicationService.getMovie(title).subscribe((movie: Movie) => {
      this.movie = movie;
      this.price = `${this.movie.price}$`;
    });
  }

  public getWatchtime(title: string, memberName: string): void {
    this.communicationService.getWatchtime(title, memberName).subscribe((watchtime: any) => {
      watchtime ? this.watchtime = watchtime.dureevisionnement : this.watchtime = 0;
    });
  }

  public getDuration(title: string): void {
    this.communicationService.getMovieDuration(title).subscribe((duration: number) => {
      this.duration = duration;
    });
  }

  public getAllRoles(title: string): void {
    this.communicationService.getAllRoles(title).subscribe((roles: string[]) => {
      this.roles = roles;
    });
  }

  public getCrew(title: string): void {
    this.communicationService.getCrew(title).subscribe((crew: Person[]) => {
      this.crew = crew;
    });
  }

  public getAwards(title: string): void {
    this.communicationService.getAwards(title).subscribe((awards: Oscar[]) => {
      this.awards = awards;
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

  public findInformation(title: string): void {
    this.getMovie(title);
    this.getDuration(title);
    this.getWatchtime(title, this.getCurrentMemberName());
    this.getAllRoles(title);
    this.getCrew(title);
    this.getAwards(title);
  }

  public select(evt: MouseEvent): void {
    const target: HTMLElement = evt.currentTarget as HTMLElement;
    const title: HTMLElement = target.firstChild as HTMLElement;
    if (title.textContent) {
      this.findInformation(title.textContent);
      this.checkMembership();
    }
    this.hide();
    this.popup = this.map.get(title.textContent as string) ? this.map.get(title.textContent as string) : null;
    this.show();
  }

  public hide(): void {
    if (this.popup) {
      this.popup.style.display = "none";
    }
  }

  public show(): void {
    if (this.popup) {
      this.popup.style.display = "block";
    }
  }

  public checkMembership(): void {
    const member = this.loggedUser.member;
    if (member) {
      this.communicationService.checkMonthlyMembership(member.email).subscribe((res: any) => {
        if (res !== 0) {
          this.price = "FREE";
        }
      });
    }
  }

  public watch(): void {
    this.router.navigate(["/watch"], { state: { role: "MEMBER", time: this.watchtime, movie: this.movie, member: this.loggedUser.member} });
  }
}
