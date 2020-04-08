
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";

// import {Hotel} from "../../../common/tables/Hotel";
// import {Room} from '../../../common/tables/Room';
// import { Member } from "../../../common/Member";
import { Oscar } from "../../../common/Oscar";
import { Movie } from "../../../common/Movie";
import { Person } from "../../../common/Person";
import { DatabaseService } from "../services/database.service";
import Types from "../types";

@injectable()
export class DatabaseController {
    public constructor(@inject(Types.DatabaseService) private databaseService: DatabaseService) { }

    public get router(): Router {
        const router: Router = Router();

        router.post("/createSchema",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.createSchema().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
                });

        router.post("/populateDb",
                    (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.populateDb().then((result: pg.QueryResult) => {
                        res.json(result);
                    }).catch((e: Error) => {
                        console.error(e.stack);
                    });
        });

        // router.get("/login", (req: Request, res: Response, next: NextFunction) => {
        //     this.databaseService.getMembers().then((result: pg.QueryResult) => {
        //         const members: Member[] = result.rows.map((member: any) => ({
        //             id: member.memberId,
        //             name: member.memberName,
        //             password: member.memberPassword,
        //             email: member.email,
        //             deliveryAddress: member.deliveryAddress
        //         }));
        //         res.json(members);
        //         }).catch((e: Error) => {
        //             console.error(e.stack);
        //         });
        //     });

        router.post("/login", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getAccount(req.body.email, req.body.password).then((result: pg.QueryResult) => {
                if (result.rowCount) {
                    res.json(result.rows); // returns a single row
                    console.log('Account found!', result.rows);
                } else {
                    console.log('No account found!');
                    res.json(-1);
                }
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/member/browse/:email",
                   (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.memberCreated(req.params.email).then((result: pg.QueryResult) => {
                    res.json(result.rowCount);
                }).catch((e: Error) => {
                    console.error(e.stack);
                    res.json(-1);
                });
        });

        router.get("/member/count",
                   (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.getNbMember().then((result: pg.QueryResult) => {
                    res.json(result.rows[0].count);
                }).catch((e: Error) => {
                    console.error(e.stack);
                });
        });

        router.post("/member/insert", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.createMember(req.body.plan, req.body.member).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        // router.get("/hotel",
        //            (req: Request, res: Response, next: NextFunction) => {
        //             // Send the request to the service and send the response
        //             this.databaseService.getHotels().then((result: pg.QueryResult) => {
        //             const hotels: Hotel[] = result.rows.map((hot: any) => (
        //                 {
        //                 hotelno: hot.hotelno,
        //                 hotelname: hot.hotelname,
        //                 city: hot.city
        //             }));
        //             res.json(hotels);
        //         }).catch((e: Error) => {
        //             console.error(e.stack);
        //         });
        //     });

        // router.get("/hotel/hotelNo",
        //            (req: Request, res: Response, next: NextFunction) => {
        //               this.databaseService.getHotelNo().then((result: pg.QueryResult) => {
        //                 const hotelPKs: string[] = result.rows.map((row: any) => row.hotelno);
        //                 res.json(hotelPKs);
        //               }).catch((e: Error) => {
        //                 console.error(e.stack);
        //             });
        //           });

        // router.post("/hotel/insert",
        //             (req: Request, res: Response, next: NextFunction) => {
        //                 const hotelNo: string = req.body.hotelNo;
        //                 const hotelName: string = req.body.hotelName;
        //                 const city: string = req.body.city;
        //                 this.databaseService.createHotel(hotelNo, hotelName, city).then((result: pg.QueryResult) => {
        //                 res.json(result.rowCount);
        //             }).catch((e: Error) => {
        //                 console.error(e.stack);
        //                 res.json(-1);
        //             });
        // });

		// router.delete("/hotel/insert", /*TODO*/);

        // router.get("/rooms",
        //            (req: Request, res: Response, next: NextFunction) => {

        //             this.databaseService.getRoomFromHotelParams(req.query)
        //             .then((result: pg.QueryResult) => {
        //                 const rooms: Room[] = result.rows.map((room: Room) => (
        //                     {
        //                     hotelno: room.hotelno,
        //                     roomno: room.roomno,
        //                     typeroom: room.typeroom,
        //                     price: parseFloat(room.price.toString())
        //                 }));
        //                 res.json(rooms);
        //             }).catch((e: Error) => {
        //                 console.error(e.stack);
        //             });
        //     });

        // router.post("/rooms/insert",
        //             (req: Request, res: Response, next: NextFunction) => {
        //             const room: Room = {
        //                 hotelno: req.body.hotelno,
        //                 roomno: req.body.roomno,
        //                 typeroom: req.body.typeroom,
        //                 price: parseFloat(req.body.price)};
        //             console.log(room);

        //             this.databaseService.createRoom(room)
        //             .then((result: pg.QueryResult) => {
        //                 res.json(result.rowCount);
        //             })
        //             .catch((e: Error) => {
        //                 console.error(e.stack);
        //                 res.json(-1);
        //             });
        // });

        router.post("/movie/insert", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.insertMovie(req.body.movie).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.post("/movie/update", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.updateMovie(req.body.movie).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.post("/movie/delete", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.deleteMovie(req.body.movieno).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.get("/movie", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getMovies().then((result: pg.QueryResult) => {
                const movies: Movie[] = result.rows.map((movie: Movie) => ({
                        movieno: movie.movieno,
                        title: movie.title,
                        genre: movie.genre,
                        productiondate: String(movie.productiondate).substr(4, 11),
                        duration: movie.duration
                    }));
                res.json(movies);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getMovie(req.params.title).then((result: pg.QueryResult) => {
                const myMovie: Movie = result.rows.map((movie: Movie) => ({
                    movieno: movie.movieno,
                    title: movie.title,
                    genre: movie.genre,
                    productiondate: String(movie.productiondate).substr(4, 11),
                    duration: movie.duration
                }))[0];
                res.json(myMovie);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title/duration", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getMovieDuration(req.params.title).then((result: pg.QueryResult) => {
                res.json(result.rows[0].duration);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/:memberName/find/:title/time", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getWatchtime(req.params.title, req.params.memberName).then((result: pg.QueryResult) => {
                res.json(result.rows[0]);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title/list/role", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getAllRoles(req.params.title).then((result: pg.QueryResult) => {
                const roles: string[] = [];
                for (const role of result.rows) {
                    roles.push(role.rolename);
                }
                res.json(roles);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title/crew", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getCrew(req.params.title).then((result: pg.QueryResult) => {
                const crew: Person[] = result.rows.map((person: Person) => ({
                    personname: person.personname,
                    birthdate: String(person.birthdate).substr(4, 11),
                    sex: person.sex,
                    nationality: person.nationality,
                    rolename: person.rolename,
                    salary: person.salary
                }));
                res.json(crew);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title/awards", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getAwards(req.params.title).then((result: pg.QueryResult) => {
                const oscars: Oscar[] = result.rows.map((oscar: Oscar) => ({
                    category: oscar.category,
                    oscartype: oscar.oscartype,
                    host: oscar.host
                }));
                res.json(oscars);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        // router.get("/tables/:tableName",
        //            (req: Request, res: Response, next: NextFunction) => {
        //         this.databaseService.getAllFromTable(req.params.tableName)
        //             .then((result: pg.QueryResult) => {
        //                 res.json(result.rows);
        //             }).catch((e: Error) => {
        //                 console.error(e.stack);
        //             });
        //     });

        // router.post("/movie/:movieName", (req: Request, res: Response, next: NextFunction) => {
        //     this.databaseService.getMovie(req.params.movieName)
        //     .then((result: pg.QueryResult) => {
        //         res.json(result.rows);
        //     }).catch((e: Error) => {
        //         console.error(e.stack);
        //     });
        // });

        return router;
    }
}
