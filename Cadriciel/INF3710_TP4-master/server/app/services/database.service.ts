import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { CreditCard } from "../../../common/CreditCard";
import { Member } from "../../../common/Member";

// import { Room } from "../../../common/tables/Room";
import { Movie } from "../../../common/Movie";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {
    private DB_NAME: string = 'NETFLIXDB';
    private PRICE: number = 9.99;

    // A MODIFIER POUR VOTRE BD
    public connectionConfig: pg.ConnectionConfig = {
        user: "sysadmin",
        database: "postgres",
        password: "1",
        port: 5432,
        host: "127.0.0.1",
        keepAlive : true
    };

    private pool: pg.Pool = new pg.Pool(this.connectionConfig);

    public constructor() {
        this.pool.connect()
        .then(() => {
            console.log('CONNECTION SUCCESSFULLY ESTABLISHED.');
        })
        .catch(() => {
            console.error('CONNECTION ERROR. EXITING PROCESS');
            process.exit(1);
        });
    }

    public async createSchema(): Promise<pg.QueryResult> {
        return this.pool.query(schema);
    }

    public async populateDb(): Promise<pg.QueryResult> {
        return this.pool.query(data);
    }

    // public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {
    //     return this.pool.query(`SELECT * FROM ${this.DB_NAME}.${tableName};`);
    // }

    public async getMovies(): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM ${this.DB_NAME}.Film`);
    }

    public async getMovie(movieName: string): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM ${this.DB_NAME}.Film WHERE titre = '${movieName}'`);
    }

    public async insertMovie(movie: Movie): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`INSERT INTO ${this.DB_NAME}.Film VALUES(${movie.movieno}, '${movie.title}', '${movie.genre}', '${movie.productiondate}', ${movie.duration}, ${movie.price})`);
    }

    public async updateMovie(movie: Movie): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`UPDATE ${this.DB_NAME}.Film SET noFilm=${movie.movieno}, titre='${movie.title}', genre='${movie.genre}', dateProduction='${movie.productiondate}', duree=${movie.duration}, prix=${movie.price} WHERE noFilm=${movie.movieno}`);
    }

    public async deleteMovie(movieno: number): Promise<pg.QueryResult> {
        return this.pool.query(`DELETE FROM ${this.DB_NAME}.Film WHERE noFilm = ${movieno}`);
    }

    public async getMovieDuration(title: string): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT duree FROM ${this.DB_NAME}.Film WHERE titre = '${title}'`);
    }

    // public async countWatchTimeID(): Promise<pg.QueryResult> {
    //     return this.pool.query(`SELECT COUNT(*) FROM ${this.DB_NAME}.Visionnement`);
    // }

    public async getWatchtime(title: string, memberName: string): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`SELECT v.dureeVisionnement FROM ${this.DB_NAME}.Membre m, ${this.DB_NAME}.Film f, ${this.DB_NAME}.Visionnement v WHERE f.titre = '${title}' AND f.noFilm = v.noFilm AND v.idMembre = m.idMembre AND m.nomMembre = '${memberName}'`);
    }

    public async addWatchtime(movieno: number, memberId: string, time: number): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`INSERT INTO ${this.DB_NAME}.Visionnement VALUES (DEFAULT, ${movieno}, '${memberId}', CURRENT_DATE, ${time});`);
    }

    public async updateWatchtime(movieno: number, memberId: string, time: number): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`UPDATE ${this.DB_NAME}.Visionnement SET dateVisionnement=CURRENT_DATE, dureeVisionnement='${time}' WHERE noFilm=${movieno} AND idMembre='${memberId}'`);
    }

    public async getMembers(): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM ${this.DB_NAME}.Membre`);
    }

    public async getAccount(email: string, password: string): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`SELECT * FROM ${this.DB_NAME}.Membre m WHERE m.adresseCourriel = '${email}' AND m.motDePasse = '${password}'`);
    }

    public async memberCreated(email: string): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT * FROM ${this.DB_NAME}.Membre m WHERE m.adresseCourriel = '${email}'`);
    }

    public async getNbMember(): Promise<pg.QueryResult> {
        return this.pool.query(`SELECT COUNT(*) FROM ${this.DB_NAME}.Membre m WHERE m.idMembre LIKE 'member%'`);
    }

    // Insert Member and CreditCard
    public async createMember(plan: string, member: Member): Promise<pg.QueryResult> {
        let zero: string = '0';
        if (member.id.length > 1) {
            zero = '';
        }
        const credit: CreditCard = member.creditCard as CreditCard;
        const memberId: string = `member${zero}${member.id}`;
        // tslint:disable-next-line: max-line-length
        const queryCredit: string = `INSERT INTO ${this.DB_NAME}.CarteCredit VALUES('${credit.cardNo}', '${memberId}', '${credit.ccv}', '${credit.ownerCard}', '${credit.expirationDate}');`;
        let queryPlan: string = '';
        if (plan === 'monthly') {
            queryPlan = `INSERT INTO ${this.DB_NAME}.MembreMensuel VALUES('${memberId}', '${this.PRICE}', CURRENT_DATE, CURRENT_DATE + 30)`;
        } else if (plan === 'payperview') {
            queryPlan = `INSERT INTO ${this.DB_NAME}.MembrePayPerView VALUES('${memberId}', 0)`;
        }

        // tslint:disable-next-line: max-line-length
        return this.pool.query(`INSERT INTO ${this.DB_NAME}.Membre VALUES('${memberId}', '${member.name}', '${member.password}', '${member.email}', '${member.zip}'); ${queryCredit} ${queryPlan}`);
    }

    public async getAllRoles(title: string): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`SELECT DISTINCT r.nomRole FROM ${this.DB_NAME}.Film f, ${this.DB_NAME}.Role r WHERE f.noFilm = r.noFilm AND f.titre = '${title}'`);
    }

    public async getCrew(title: string): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`SELECT p.nomPersonne, p.dateNaissance, p.sexe, p.nationalite, r.nomRole, r.salaire FROM ${this.DB_NAME}.Film f, ${this.DB_NAME}.Role r, ${this.DB_NAME}.Personne p WHERE f.titre = '${title}' AND f.noFilm = r.noFilm AND r.idPersonne = p.idPersonne`);
    }

    public async getAwards(title: string): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`SELECT o.categorie, o.type, c.mc FROM ${this.DB_NAME}.Film f, ${this.DB_NAME}.Oscar o, ${this.DB_NAME}.Ceremonie c WHERE f.titre = '${title}' AND f.noFilm = o.noFilm AND o.noCeremonie = c.noCeremonie`);
    }

    public async checkMonthlyMembership(email: string): Promise<pg.QueryResult> {
        // tslint:disable-next-line: max-line-length
        return this.pool.query(`SELECT * FROM ${this.DB_NAME}.Membre m, ${this.DB_NAME}.MembreMensuel mon WHERE m.adresseCourriel = '${email}' AND m.idMembre = mon.idMembre`);
    }

    // // HOTEL
    // public async getHotels(): Promise<pg.QueryResult> {

    //     return this.pool.query(`SELECT * FROM ${this.DB_NAME}.Hotel;`);
    // }

    // public async getHotelNo(): Promise<pg.QueryResult> {

    //     return this.pool.query(`SELECT hotelNo FROM ${this.DB_NAME}.Hotel;`);

    // }

    // public async createHotel(hotelNo: string, hotelName: string, city: string): Promise<pg.QueryResult> {
    //     const values: string[] = [
    //         hotelNo,
    //         hotelName,
    //         city
    //     ];
    //     const queryText: string = `INSERT INTO ${this.DB_NAME}.Hotel VALUES($1, $2, $3);`;

    //     return this.pool.query(queryText, values);
    // }

    // // ROOM
    // public async getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {

    //     let query: string =
    //     `SELECT * FROM ${this.DB_NAME}.room
    //     WHERE hotelno=\'${hotelNo}\'`;
    //     if (roomType !== undefined) {
    //         query = query.concat('AND ');
    //         query = query.concat(`typeroom=\'${roomType}\'`);
    //     }
    //     if (price !== undefined) {
    //         query = query.concat('AND ');
    //         query = query.concat(`price =\'${price}\'`);
    //     }
    //     console.log(query);

    //     return this.pool.query(query);
    // }

    // public async getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {

    //     let query: string = `SELECT * FROM ${this.DB_NAME}.room \n`;
    //     const keys: string[] = Object.keys(params);
    //     if (keys.length > 0) {
    //         query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
    //     }

    //     // On enleve le premier element
    //     keys.shift();

    //     // tslint:disable-next-line:forin
    //     for (const param in keys) {
    //         const value: string = keys[param];
    //         query = query.concat(`AND ${value} = \'${params[value]}\'`);
    //         if (param === 'price') {
    //             query = query.replace('\'', '');
    //         }
    //     }

    //     console.log(query);

    //     return this.pool.query(query);

    // }

    // public async createRoom(room: Room): Promise<pg.QueryResult> {
    //     const values: string[] = [
    //         room.roomno,
    //         room.hotelno,
    //         room.typeroom,
    //         room.price.toString()
    //     ];
    //     const queryText: string = `INSERT INTO ${this.DB_NAME}.ROOM VALUES($1,$2,$3,$4);`;

    //     return this.pool.query(queryText, values);
    // }

    // // GUEST
    // public async createGuest(guestNo: string, nas: string, guestName: string, gender: string, guestCity: string): Promise<pg.QueryResult> {
    //     // this.pool.connect();
    //     const values: string[] = [
    //         guestNo,
    //         nas,
    //         guestName,
    //         gender,
    //         guestCity
    //     ];
    //     const queryText: string = `INSERT INTO ${this.DB_NAME}.ROOM VALUES($1,$2,$3,$4,$5);`;

    //     return this.pool.query(queryText, values);
    // }

    // // BOOKING
    // public async createBooking(hotelNo: string, guestNo: string, dateFrom: Date, dateTo: Date, roomNo: string): Promise<pg.QueryResult> {
    //     const values: string[] = [
    //         hotelNo,
    //         guestNo,
    //         dateFrom.toString(),
    //         dateTo.toString(),
    //         roomNo
    //     ];
    //     const queryText: string = `INSERT INTO ${this.DB_NAME}.ROOM VALUES($1,$2,$3,$4,$5);`;

    //     return this.pool.query(queryText, values);
    //     }
}
