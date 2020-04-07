// tslint:disable: no-any
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { concat, of, Observable, Subject } from "rxjs";
import { catchError } from "rxjs/operators";
import { Member } from "../../../common/Member";
import { Movie } from "../../../common/Movie";
// import {Hotel} from "../../../common/tables/Hotel";
// import { Room } from "../../../common/tables/Room";

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

    public insertMovie(movie: Movie): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/admin/movie/insert", {movie}).pipe(
            catchError(this.handleError<number>("insertMovie")),
        );
    }

    public deleteMovie(movieno: number): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/admin/movie/delete", {movieno}).pipe(
            catchError(this.handleError<number>("deleteMovie")),
        );
    }

    public updateMovie(movie: Movie): Observable<number> {
        return this.http.post<number>(this.BASE_URL + "/admin/movie/update", {movie}).pipe(
            catchError(this.handleError<number>("updateMovie")),
        );
    }

    public getMovies(): Observable<Movie[]> {
        return this.http.get<Movie[]>(this.BASE_URL + "/admin/movie").pipe(
            catchError(this.handleError<Movie[]>("getMovies")),
        );
    }

    public getNbMember(): Observable<string> {
        return this.http.get<string>(this.BASE_URL + "/register/payment").pipe(
            catchError(this.handleError<string>("insertMember")),
        );
    }

    public insertMember(plan: string, member: Member): Observable<string> {
        return this.http.post<string>(this.BASE_URL + "/register/payment", {plan, member}).pipe(
            catchError(this.handleError<string>("insertMember")),
        );
    }

    // public getHotels(): Observable<any[]> {
    //     return this.http.get<Hotel[]>(this.BASE_URL + "/hotel").pipe(
    //         catchError(this.handleError<Hotel[]>("getHotels")),
    //     );
    // }

    // public getHotelPKs(): Observable<string[]> {

    //     return this.http.get<string[]>(this.BASE_URL + "/hotel/hotelNo").pipe(
    //         catchError(this.handleError<string[]>("getHotelPKs")),
    //     );
    // }

    // public insertHotel(hotel: any): Observable<number> {
    //     return this.http.post<number>(this.BASE_URL + "/hotel/insert", hotel).pipe(
    //         catchError(this.handleError<number>("inserHotel")),
    //     );
    // }

    // public insertRoom(room: Room): Observable<number> {
    //     return this.http.post<number>(this.BASE_URL + "/rooms/insert", room).pipe(
    //         catchError(this.handleError<number>("inserHotel")),
    //     );
    // }

    // public deleteHotel(): void {
    // }

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
