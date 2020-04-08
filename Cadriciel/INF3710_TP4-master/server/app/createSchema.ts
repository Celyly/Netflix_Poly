export const schema: string =
`SET search_path = 'NETFLIXDB';

DROP SCHEMA IF EXISTS NETFLIXDB CASCADE;
CREATE SCHEMA NETFLIXDB;

CREATE TABLE IF NOT EXISTS NETFLIXDB.Member (
	memberId		    VARCHAR(50)             NOT NULL,
    memberName          VARCHAR(50)             NOT NULL,
    memberPassword      VARCHAR(500)            NOT NULL, -- Doit être encrypté
    email               VARCHAR(50)             NOT NULL,
    deliveryAddress     VARCHAR(50)             NOT NULL,
    PRIMARY KEY (memberId)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberMonthly (
	memberId		    VARCHAR(50)             NOT NULL,
    subscriptionPrice   NUMERIC(9,2)            NOT NULL,
    startDate           DATE                    NOT NULL,
    dueDate             DATE                    NOT NULL,
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (memberId)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberPayPerView (
	memberId		        VARCHAR(50)           NOT NULL,
    film_payperview         INT                   NOT NULL, -- nombre de films
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (memberId)
);


CREATE TABLE IF NOT EXISTS NETFLIXDB.CreditCard (
    cardNo              VARCHAR(50)          NOT NULL,
	memberId	        VARCHAR(50)          NOT NULL,
    ccv                 INT                  NOT NULL,
    ownerCard           VARCHAR(50)          NOT NULL,
    expirationDate      DATE                 NOT NULL CHECK (expirationDate > CURRENT_DATE),
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (cardNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Movie (
    movieNo         SERIAL                  NOT NULL,
    title           VARCHAR(50)             NOT NULL,
    genre           VARCHAR(50)             NOT NULL,
    productionDate  DATE                    NOT NULL,
    duration        INT                     NOT NULL,
    PRIMARY KEY (movieNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Viewing (
    viewNo          SERIAL               NOT NULL,
    movieNo         SERIAL               NOT NULL,
    memberId        VARCHAR(50)          NOT NULL,
    viewDate        DATE                 NOT NULL,
    duration        INT                  NOT NULL,
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (viewNo)
);


CREATE TABLE IF NOT EXISTS NETFLIXDB.DVD (
    DVDNo           SERIAL        NOT NULL,
    movieNo         SERIAL        NOT NULL,
    dvdPrice        SERIAL        NOT NULL,
    FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (DVDNo, movieNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Order (
    orderNo             SERIAL                NOT NULL,
    memberId            VARCHAR(50)           NOT NULL,
    DVDNo               SERIAL                NOT NULL,
    movieNo             SERIAL                NOT NULL,
    deliveryPrice       NUMERIC(9, 2)         NOT NULL,
    deliveryDate        DATE                  NOT NULL,
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (DVDNo, movieNo) REFERENCES NETFLIXDB.DVD(DVDNo, movieNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (orderNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Person (
    personId        SERIAL                  NOT NULL,
    personName      VARCHAR(50)             NOT NULL,
    birthDate       DATE                    NOT NULL,
    sex             CHAR                    DEFAULT 'M' CHECK (sex IN ('M', 'F')),
    nationality     VARCHAR(50),
    PRIMARY KEY (personId)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Role (
    roleNo          SERIAL                  NOT NULL,
    personId        SERIAL                  NOT NULL,
    movieNo         SERIAL                  NOT NULL,
    roleName        VARCHAR(50)             NOT NULL,
    salary          NUMERIC(9,2)            NOT NULL,
    FOREIGN KEY (personId) REFERENCES NETFLIXDB.Person(personId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (roleNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Ceremony (
    ceremonyNo      SERIAL                  NOT NULL,
    host            VARCHAR(50)             NOT NULL,
    PRIMARY KEY (ceremonyNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Oscar (
    oscarNo         SERIAL                  NOT NULL,
    ceremonyNo      SERIAL                  NOT NULL,
    movieNo         SERIAL                  NOT NULL,
    category        VARCHAR(50)             NOT NULL,
    oscarType       VARCHAR(50)             NOT NULL CHECK (oscarType IN ('Nominee','Winner')),
    FOREIGN KEY (ceremonyNo) REFERENCES NETFLIXDB.Ceremony(ceremonyNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (oscarNo)
);`;
