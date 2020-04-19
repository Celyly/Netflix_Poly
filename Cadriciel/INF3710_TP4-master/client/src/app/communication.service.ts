// tslint:disable: no-any
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Member } from "../../../common/Member";
import { Movie } from "../../../common/Movie";
import { Oscar } from "../../../common/Oscar";
import { Person } from "../../../common/Person";

@Injectable()
export class CommunicationService {

    private readonly BASE_URL: string = "http://localhost:3000/database";
    public constructor(private http: HttpClient) { }

    private _listners: any = new Subject<any>();

    public listen(): Observable<any> {
       return this._listners.asObservable();
    }

    public filter(filterBy: string): void {
       this._listners.next(filterBy);
    }

    public auth(email: string, password: string): Observable<string> {
        return this.http.post<string>(this.BASE_URL + "/login", {email, password});
    }

    public memberCreated(email: string): Observable<number> {
        return this.http.get<number>(this.BASE_URL + `/member/browse/${email}`).pipe(
            catchError(this.handleError<number>("memberCreated")),
        );
    }

    public getMembers(): Observable<Member[]> {
        return this.http.get<Member[]>(this.BASE_URL + "/member").pipe(
            catchError(this.handleError<Member[]>("getMembers")),
        );
    }

    public getMovie(title: string): Observable<Movie> {
        return this.http.get<Movie>(this.BASE_URL + `/movie/${title}`).pipe(
            catchError(this.handleError<Movie>("getMovie")),
        );
    }

    public insertMovie(movie: Movie): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/movie/insert", {movie}).pipe(
            catchError(this.handleError<number>("insertMovie")),
        );
    }

    public deleteMovie(movieno: number): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/movie/delete", {movieno}).pipe(
            catchError(this.handleError<number>("deleteMovie")),
        );
    }

    public updateMovie(movie: Movie): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/movie/update", {movie}).pipe(
            catchError(this.handleError<number>("updateMovie")),
        );
    }

    public getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.BASE_URL + "/movie").pipe(
            catchError(this.handleError<Movie[]>("getMovies")),
        );
    }

    public getMovieDuration(title: string): Observable<number> {
        return this.http.get<number>(this.BASE_URL + `/movie/${title}/duration`).pipe(
            catchError(this.handleError<number>("getMovieDuration")),
        );
    }

    public getWatchtime(title: string, memberName: string): Observable<any> {
        return this.http.get<any>(this.BASE_URL + `/${memberName}/find/${title}/time`).pipe(
            catchError(this.handleError<any>("getWatchtime")),
        );
    }

    public updateWatchtime(movieno: number, memberid: string, time: number): Observable<any> {
        return this.http.post<any>(this.BASE_URL + `/watch/time/update`, {movieno, memberid, time}).pipe(
            catchError(this.handleError<any>("updateWatchtime")),
        );
    }

    public addWatchtime(movieno: number, memberid: string, time: number): Observable<any> {
        return this.http.post<any>(this.BASE_URL + `/watch/time/add`, {movieno, memberid, time}).pipe(
            catchError(this.handleError<any>("addWatchtime")),
        );
    }

    public getNbMember(): Observable<string> {
        return this.http.get<string>(this.BASE_URL + "/member/count").pipe(
            catchError(this.handleError<string>("insertMember")),
        );
    }

    public insertMember(plan: string, member: Member): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/member/insert", {plan, member}).pipe(
            catchError(this.handleError<number>("insertMember")),
        );
    }

    public checkMonthlyMembership(email: string): Observable<number>{
        return this.http.get<number>(this.BASE_URL + `/member/browse/${email}/plan`).pipe(
            catchError(this.handleError<number>("isMonthlyMember")),
        );
    }

    public getAllRoles(title: string): Observable<string[]> {
        return this.http.get<string[]>(this.BASE_URL + `/movie/${title}/list/role`).pipe(
            catchError(this.handleError<string[]>("getAllRoles"))
        );
    }

    public getCrew(title: string): Observable<Person[]> {
        return this.http.get<Person[]>(this.BASE_URL + `/movie/${title}/crew`).pipe(
            catchError(this.handleError<Person[]>("getCrew")),
        );
    }

    public getAwards(title: string): Observable<Oscar[]> {
        return this.http.get<Oscar[]>(this.BASE_URL + `/movie/${title}/awards`).pipe(
            catchError(this.handleError<Oscar[]>("getAwards")),
        );
    }

    public setUpDatabase(): Observable<any> {
        return concat(this.http.post<any>(this.BASE_URL + "/createSchema", []),
                      this.http.post<any>(this.BASE_URL + "/populateDb", []));
    }

    private handleError<T>(request: string, result?: T): (error: Error) => Observable<T> {

        return (error: Error): Observable<T> => {
            return of(result as T);
        };
    }
}
