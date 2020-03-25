// export const schema: string = `
// SET search_path = 'NETFLIXDB';

// DROP SCHEMA IF EXISTS FLOTTEDB CASCADE;
// CREATE SCHEMA NETFLIXDB;

// CREATE TABLE IF NOT EXISTS NETFLIXDB.Member (
// 	memberId		    SERIAL                  NOT NULL,
//     memberName          VARCHAR(50)             NOT NULL,
//     memberPassword      VARCHAR(50)             NOT NULL, -- Doit être encrypté
//     email               VARCHAR(50)             NOT NULL,
//     deliveryAddress     VARCHAR(50)             NOT NULL,
//     PRIMARY KEY (memberId)
// );

// CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberMonthly (
// 	memberId		    SERIAL                  NOT NULL,
//     subscriptionPrice   NUMERIC(9,2)            NOT NULL,
//     startDate           DATE                    NOT NULL,
//     dueDate             DATE                    NOT NULL,
//     FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     PRIMARY KEY (memberId)
// );

// CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberPayPerView (
// 	memberId		        SERIAL                NOT NULL,
//     film_payperview         INT                   NOT NULL,
//     FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     PRIMARY KEY (memberId)
// );


// CREATE TABLE IF NOT EXISTS NETFLIXDB.CreditCard (
//     cardNo              VARCHAR(20)          NOT NULL,
// 	memberId	        SERIAL               NOT NULL,
//     ccv                 INT                  NOT NULL,
//     ownerCard           VARCHAR(50)          NOT NULL,
//     expirationDate      DATE                 NOT NULL,
//     FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     PRIMARY KEY (cardNo)
// );

// CREATE TABLE IF NOT EXISTS NETFLIXDB.Order (
//     orderNo             SERIAL                NOT NULL,
//     memberId            SERIAL                NOT NULL,
//     deliveryPrice       NUMERIC(9, 2)         NOT NULL,
//     deliveryDate        DATE                  NOT NULL,
//     distance            NUMERIC(9, 2)         NOT NULL,
//     FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     PRIMARY KEY (orderNo)
// );

// CREATE TABLE IF NOT EXISTS NETFLIXDB.Movie (
//     movieNo         SERIAL                  NOT NULL,
//     title           VARCHAR(20)             NOT NULL,
//     genre           VARCHAR(20)             NOT NULL,
//     productionDate  DATE                    NOT NULL,
//     duration        NUMERIC(9,2)            NOT NULL,
//     PRIMARY KEY (movieNo)
// );

// CREATE TABLE IF NOT EXISTS NETFLIXDB.Viewing (
//     viewNo          SERIAL               NOT NULL,
//     movieNo         SERIAL               NOT NULL,
//     memberId        SERIAL               NOT NULL,
//     viewDate        DATE                 NOT NULL,
//     duration        NUMERIC(9, 2)        NOT NULL,
//     FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     PRIMARY KEY (viewNo)
// );


// CREATE TABLE IF NOT EXISTS NETFLIXDB.DVD (
//     DVDNo           SERIAL        NOT NULL,
//     orderNo         SERIAL        NOT NULL,
//     movieNo         SERIAL        NOT NULL,
//     FOREIGN KEY (orderNo) REFERENCES NETFLIXDB.Order(orderNo)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     PRIMARY KEY (DVDNo)
// );

// CREATE TABLE IF NOT EXISTS NETFLIXDB.Person (
//     personId        SERIAL                  NOT NULL,
//     personName      VARCHAR(20)             NOT NULL,
//     age             INT                     NOT NULL,
//     sex             CHAR                    DEFAULT 'M' CHECK (sex IN ('M', 'F')),
//     nationality     VARCHAR(20),
//     PRIMARY KEY (personId)
// );

// -- J'ai décidé de mettre salaire dans Role étant donné qu'on a une référence vers la personne concernée
// CREATE TABLE IF NOT EXISTS NETFLIXDB.Role (
//     roleNo          SERIAL                  NOT NULL,
//     personId        SERIAL                  NOT NULL,
//     salary          NUMERIC(9,2)            NOT NULL,
//     PRIMARY KEY (personId)
// );

// CREATE TABLE IF NOT EXISTS NETFLIXDB.Ceremony (
//     ceremonyNo      SERIAL                  NOT NULL,
//     host            VARCHAR(20)             NOT NULL,
//     category        VARCHAR(20)             NOT NULL,
//     PRIMARY KEY (ceremonyNo)
// );

// CREATE TABLE IF NOT EXISTS NETFLIXDB.Oscar (
//     oscarNo         SERIAL                  NOT NULL,
//     ceremonyNo      SERIAL                  NOT NULL,
//     movieNo         SERIAL                  NOT NULL,
//     category        VARCHAR(20)             NOT NULL,
//     oscarType       VARCHAR(20)             NOT NULL CHECK (oscarType IN ('Nominee','Winner')),
//     FOREIGN KEY (ceremonyNo) REFERENCES NETFLIXDB.Ceremony(ceremonyNo)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
//     ON UPDATE CASCADE ON DELETE CASCADE,
//     PRIMARY KEY (oscarNo)
// );`;

export const schema: string = `
SET search_path = hotelDB;

DROP SCHEMA IF EXISTS HOTELDB CASCADE;
CREATE SCHEMA HOTELDB;

CREATE TABLE IF NOT EXISTS  HOTELDB.Hotel (
		hotelNo		VARCHAR(10)		NOT NULL,
		hotelName 	VARCHAR(20)		NOT NULL,
		city		VARCHAR(50)		NOT NULL,
		PRIMARY KEY (hotelNo));

CREATE TABLE IF NOT EXISTS HOTELDB.Room(
roomNo VARCHAR(10) NOT NULL,
hotelNo VARCHAR(10)	NOT NULL,
typeroom VARCHAR(10)	NOT NULL,
price NUMERIC(6,3) NOT NULL,
PRIMARY KEY (roomNo, hotelNo),
FOREIGN KEY(hotelNo) REFERENCES HOTELDB.Hotel(hotelNo) ON DELETE CASCADE ON UPDATE CASCADE);


CREATE DOMAIN HOTELDB.sexType AS CHAR
	CHECK (VALUE IN ('M', 'F'));

CREATE TABLE IF NOT EXISTS HOTELDB.Guest(
guestNo		VARCHAR(10)		NOT NULL,
nas		VARCHAR(10)		UNIQUE NOT NULL,
guestName 	VARCHAR(20)		NOT NULL,
gender		sexType			DEFAULT 'M',
guestCity	VARCHAR(50)		NOT NULL,
PRIMARY KEY (guestNo));

CREATE TABLE IF NOT EXISTS HOTELDB.Booking(
		hotelNo		VARCHAR(10)		NOT NULL,
		guestNo	  	VARCHAR(10)		NOT NULL,
		dateFrom 	DATE			NOT NULL,
		dateTo		DATE			NULL,
		roomNo		VARCHAR(10)		NOT NULL,
		PRIMARY KEY (hotelNo, guestNo, roomNO, dateFrom),
		FOREIGN KEY (guestNo) REFERENCES HOTELDB.Guest(guestNo)
		ON DELETE SET NULL ON UPDATE CASCADE,
		FOREIGN KEY (hotelNo, roomNo) REFERENCES HOTELDB.Room (hotelNo, roomNo)
		ON DELETE CASCADE ON UPDATE CASCADE,
		CONSTRAINT date CHECK (dateTo >= dateFrom),
		CONSTRAINT dateFrom CHECK (dateFrom >= current_date));

ALTER TABLE HOTELDB.Guest ALTER gender DROP DEFAULT;
`;
