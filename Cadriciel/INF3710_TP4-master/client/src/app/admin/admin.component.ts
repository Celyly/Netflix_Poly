// tslint:disable: no-magic-numbers
// tslint:disable: no-any
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from "@angular/core";
import { Member } from "../../../../common/Member";
import { Movie } from "../../../../common/Movie";
import { CommunicationService } from "../communication.service";
import { LoggedUser } from "../logged-user";
import { LoggedUserService } from "../logged-user.service";

@Component({
  selector: "app-admin",
  templateUrl: "./admin.component.html",
  styleUrls: ["./admin.component.css"]
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChildren("moviesDB") public moviesDB: QueryList<ElementRef<HTMLElement>>;
  @ViewChild("idInput") public idInput: ElementRef;

  private months: Map<string, string>;
  public isEditing: boolean;
  public viewMember: boolean;

  public loggedUser: LoggedUser;
  public movies: Movie[];
  public members: Member[];

  public selectedRow: HTMLElement;
  public selectedMovie: Movie;
  public newMovie: Movie;

  public constructor(public communicationService: CommunicationService, public loggedService: LoggedUserService) {
    this.loggedService.loggedUser.subscribe((user) => this.loggedUser = user);
    this.isEditing = false;
    this.viewMember = false;
    this.selectedMovie = { movieno: 0, title: "", genre: "", productiondate: "", duration: 0, price: 0 };
    this.newMovie = { movieno: 0, title: "", genre: "", productiondate: "", duration: 0, price: 0 };

    this.months = new Map<string, string>()
      .set("Jan", "01")
      .set("Feb", "02")
      .set("Mar", "03")
      .set("Apr", "04")
      .set("May", "05")
      .set("Jun", "06")
      .set("Jul", "07")
      .set("Aug", "08")
      .set("Sep", "09")
      .set("Oct", "10")
      .set("Nov", "11")
      .set("Dec", "12");
  }

  public ngOnInit(): void {
    this.getMovies();
    this.getMembers();
  }

  public ngAfterViewInit(): void {
    this.moviesDB.changes.subscribe((comps: QueryList<ElementRef<HTMLElement>>) => {
        const movieArray: ElementRef<HTMLElement>[] = this.moviesDB.toArray();
        if (movieArray.length) {
          this.selectedRow = movieArray[0].nativeElement;
          this.setSelectedMovie();
          this.addBgColor(this.selectedRow);
        }
     });
  }

  public getMembers(): void {
    this.communicationService.getMembers().subscribe((members) => {
      this.members = members;
    });
  }

  public getMovies(): void {
    this.communicationService.getMovies().subscribe((movies: Movie[]) => {
      this.movies = movies;
    });
  }

  public addMovie(): void {
    if (this.verifyInputs()) {
      this.communicationService.insertMovie(this.newMovie).subscribe((res: any) => {
        if (res !== -1) {
          this.getMovies();
        } else {
          alert("Invalid data, please verify your inputs");
        }
      });
    }
  }

  public updateMovie(): void {
    this.communicationService.updateMovie(this.newMovie).subscribe((res: any) => {
      if (res !== -1) {
        this.getMovies();
        this.isEditing = false;
        this.disableIdInput(false);
        this.newMovie = { movieno: 0, title: "", genre: "", productiondate: "", duration: 0, price: 0 };
      }  else {
        alert("Invalid data, please verify your inputs");
      }
    });
  }

  public deleteMovie(): void {
    this.communicationService.deleteMovie(this.selectedMovie.movieno).subscribe((res: any) => {
      if (res !== -1) {
        this.getMovies();
        this.selectedMovie = { movieno: 0, title: "", genre: "", productiondate: "", duration: 0, price: 0 };
      } else {
        alert("Error! Couldn't properly delete the movie. Try again");
      }
    });
  }

  public selectRow(evt: MouseEvent): void {
    if (!this.isEditing) {
      this.removeBgColor(this.selectedRow);
      this.selectedRow = evt.currentTarget as HTMLElement;
      this.setSelectedMovie();
      this.addBgColor(this.selectedRow);
    }
  }

  public setSelectedMovie(): void {
    this.selectedMovie.movieno = parseFloat(this.selectedRow.childNodes[0].textContent as string);
    this.selectedMovie.title = this.selectedRow.childNodes[1].textContent as string;
    this.selectedMovie.genre = this.selectedRow.childNodes[2].textContent as string;
    this.selectedMovie.productiondate = this.selectedRow.childNodes[3].textContent as string;
    this.selectedMovie.duration = parseFloat(this.selectedRow.childNodes[4].textContent as string);
    this.selectedMovie.price = parseFloat(this.selectedRow.childNodes[5].textContent as string);
  }

  public formatDate(date: string): string {
    let month: string = "00";
    const formattedMonth: string | undefined = this.months.get(date.substr(0, 3));
    formattedMonth ? month = formattedMonth : month = "00";
    const day: string = date.substr(4, 2);
    const year: string = date.substr(7, 4);

    return `${year}-${month}-${day}`;
  }

  public enterEditMode(): void {
    this.isEditing = true;
    this.disableIdInput(true);
    this.newMovie = this.selectedMovie;
    this.newMovie.productiondate = this.formatDate(this.newMovie.productiondate);
  }

  public cancel(): void {
    this.isEditing = false;
    this.disableIdInput(false);
    this.newMovie = { movieno: 0, title: "", genre: "", productiondate: "", duration: 0, price: 0 };
  }

  public removeBgColor(element: HTMLElement): void {
    if (element) {
      element.style.backgroundColor = "";
    }

  }

  public addBgColor(element: HTMLElement): void {
    if (element) {
      element.style.backgroundColor = "rgba(245, 71, 89, 0.297)";
    }
  }

  public resetAll(): void {
    this.communicationService.setUpDatabase().subscribe((res: any) => {
      this.getMovies();
      this.getMembers();
      this.moviesDB.changes.subscribe((comps: QueryList<ElementRef<HTMLElement>>) => {
        const movieArray: ElementRef<HTMLElement>[] = this.moviesDB.toArray();
        if (movieArray.length) {
          this.selectedRow = movieArray[0].nativeElement;
          this.setSelectedMovie();
          this.addBgColor(this.selectedRow);
        }
     });
    });
  }

  public disableIdInput(disabled: boolean): void {
    if (disabled) {
      this.idInput.nativeElement.setAttribute("readonly", "");
    } else {
      this.idInput.nativeElement.removeAttribute("readonly");
    }
  }

  public verifyInputs(): boolean {
    if (this.newMovie.title === "" || this.newMovie.genre === "" || this.newMovie.duration === 0) {
      alert("Invalid data, please verify your inputs");

      return false;
    }

    return true;
  }

  public isNumber(event: KeyboardEvent, decimal: boolean): boolean {
    const numbers: string[] = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

    if (decimal) {
      numbers.push(".");
    }

    return numbers.includes(event.key);
  }

  public switchToMemberView(value: boolean): void {
    this.viewMember = value;
  }
}
