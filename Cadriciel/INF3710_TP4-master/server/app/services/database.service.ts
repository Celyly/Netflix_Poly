import { injectable } from "inversify";
import * as pg from "pg";
import "reflect-metadata";
import { Room } from "../../../common/tables/Room";
import {schema} from "../createSchema";
import {data} from "../populateDB";

@injectable()
export class DatabaseService {
    private DB_NAME: string = 'HOTELDB';

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

    // /*

    //     METHODES DE DEBUG
    // */
    public async createSchema(): Promise<pg.QueryResult> {

        return this.pool.query(schema);
    }

    public async populateDb(): Promise<pg.QueryResult> {

        return this.pool.query(data);
    }

    public async getAllFromTable(tableName: string): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM ${this.DB_NAME}.${tableName};`);
    }

    // HOTEL
    public async getHotels(): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT * FROM ${this.DB_NAME}.Hotel;`);
    }

    public async getHotelNo(): Promise<pg.QueryResult> {

        return this.pool.query(`SELECT hotelNo FROM ${this.DB_NAME}.Hotel;`);

    }

    public async createHotel(hotelNo: string, hotelName: string, city: string): Promise<pg.QueryResult> {
        const values: string[] = [
            hotelNo,
            hotelName,
            city
        ];
        const queryText: string = `INSERT INTO ${this.DB_NAME}.Hotel VALUES($1, $2, $3);`;

        return this.pool.query(queryText, values);
    }
	
	// public async deleteHotel(/*Todo*/): void /*TODO*/  {
	// 	/*TODO*/
	// }

    // ROOM
    public async getRoomFromHotel(hotelNo: string, roomType: string, price: number): Promise<pg.QueryResult> {

        let query: string =
        `SELECT * FROM ${this.DB_NAME}.room
        WHERE hotelno=\'${hotelNo}\'`;
        if (roomType !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`typeroom=\'${roomType}\'`);
        }
        if (price !== undefined) {
            query = query.concat('AND ');
            query = query.concat(`price =\'${price}\'`);
        }
        console.log(query);

        return this.pool.query(query);
    }

    public async getRoomFromHotelParams(params: object): Promise<pg.QueryResult> {

        let query: string = `SELECT * FROM ${this.DB_NAME}.room \n`;
        const keys: string[] = Object.keys(params);
        if (keys.length > 0) {
            query = query.concat(`WHERE ${keys[0]} =\'${params[keys[0]]}\'`);
        }

        // On enleve le premier element
        keys.shift();

        // tslint:disable-next-line:forin
        for (const param in keys) {
            const value: string = keys[param];
            query = query.concat(`AND ${value} = \'${params[value]}\'`);
            if (param === 'price') {
                query = query.replace('\'', '');
            }
        }

        console.log(query);

        return this.pool.query(query);

    }

    public async createRoom(room: Room): Promise<pg.QueryResult> {
        const values: string[] = [
            room.roomno,
            room.hotelno,
            room.typeroom,
            room.price.toString()
        ];
        const queryText: string = `INSERT INTO ${this.DB_NAME}.ROOM VALUES($1,$2,$3,$4);`;

        return this.pool.query(queryText, values);
    }

    // GUEST
    public async createGuest(guestNo: string, nas: string, guestName: string, gender: string, guestCity: string): Promise<pg.QueryResult> {
        // this.pool.connect();
        const values: string[] = [
            guestNo,
            nas,
            guestName,
            gender,
            guestCity
        ];
        const queryText: string = `INSERT INTO ${this.DB_NAME}.ROOM VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
    }

    // BOOKING
    public async createBooking(hotelNo: string, guestNo: string, dateFrom: Date, dateTo: Date, roomNo: string): Promise<pg.QueryResult> {
        const values: string[] = [
            hotelNo,
            guestNo,
            dateFrom.toString(),
            dateTo.toString(),
            roomNo
        ];
        const queryText: string = `INSERT INTO ${this.DB_NAME}.ROOM VALUES($1,$2,$3,$4,$5);`;

        return this.pool.query(queryText, values);
        }
}
