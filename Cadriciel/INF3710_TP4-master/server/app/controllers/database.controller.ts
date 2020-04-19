// tslint:disable: max-line-length
// tslint:disable: no-magic-numbers
import { NextFunction, Request, Response, Router } from "express";
import { inject, injectable } from "inversify";
import * as pg from "pg";
import { Member } from "../../../common/Member";
import { Movie } from "../../../common/Movie";
import { Oscar } from "../../../common/Oscar";
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

        router.get("/member", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getMembers().then((result: pg.QueryResult) => {
                const members: Member[] = result.rows.map((member: any) => ({
                        id: member.idmembre,
                        name: member.nommembre,
                        password: member.motdepasse,
                        email: member.adressecourriel,
                        zip: member.adressepostale,
                        creditCard: null
                    }));
                res.json(members);
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

        router.get("/member/browse/:email/plan",
                   (req: Request, res: Response, next: NextFunction) => {
                    this.databaseService.checkMonthlyMembership(req.params.email).then((result: pg.QueryResult) => {
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
                const movies: Movie[] = result.rows.map((movie: any) => ({
                        movieno: movie.nofilm,
                        title: movie.titre,
                        genre: movie.genre,
                        productiondate: String(movie.dateproduction).substr(4, 11),
                        duration: movie.duree,
                        price: movie.prix
                    }));
                res.json(movies);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getMovie(req.params.title).then((result: pg.QueryResult) => {
                const myMovie: Movie = result.rows.map((movie: any) => ({
                    movieno: movie.nofilm,
                    title: movie.titre,
                    genre: movie.genre,
                    productiondate: String(movie.dateproduction).substr(4, 11),
                    duration: movie.duree,
                    price: movie.prix
                }))[0];
                res.json(myMovie);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title/duration", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getMovieDuration(req.params.title).then((result: pg.QueryResult) => {
                res.json(result.rows[0].duree);
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

        router.post("/watch/time/update", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.updateWatchtime(req.body.movieno, req.body.memberid, req.body.time).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.post("/watch/time/add", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.addWatchtime(req.body.movieno, req.body.memberid, req.body.time).then((result: pg.QueryResult) => {
                res.json(result.rowCount);
            }).catch((e: Error) => {
                console.error(e.stack);
                res.json(-1);
            });
        });

        router.get("/movie/:title/list/role", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getAllRoles(req.params.title).then((result: pg.QueryResult) => {
                const roles: string[] = [];
                for (const role of result.rows) {
                    roles.push(role.nomrole);
                }
                res.json(roles);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title/crew", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getCrew(req.params.title).then((result: pg.QueryResult) => {
                const crew: Person[] = result.rows.map((person: any) => ({
                    personname: person.nompersonne,
                    birthdate: String(person.datenaissance).substr(4, 11),
                    sex: person.sexe,
                    nationality: person.nationalite,
                    rolename: person.nomrole,
                    salary: person.salaire
                }));
                res.json(crew);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        router.get("/movie/:title/awards", (req: Request, res: Response, next: NextFunction) => {
            this.databaseService.getAwards(req.params.title).then((result: pg.QueryResult) => {
                const oscars: Oscar[] = result.rows.map((oscar: any) => ({
                    category: oscar.categorie,
                    oscartype: oscar.type,
                    host: oscar.mc
                }));
                res.json(oscars);
            }).catch((e: Error) => {
                console.error(e.stack);
            });
        });

        return router;
    }
}
