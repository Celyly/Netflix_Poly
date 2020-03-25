SET search_path = 'NETFLIXDB';

DROP SCHEMA IF EXISTS FLOTTEDB CASCADE;
CREATE SCHEMA NETFLIXDB;

CREATE TABLE IF NOT EXISTS NETFLIXDB.Member (
	memberId		    SERIAL                  NOT NULL,
    memberName          VARCHAR(50)             NOT NULL,
    memberPassword      VARCHAR(50)             NOT NULL, -- Doit être encrypté
    email               VARCHAR(50)             NOT NULL,
    deliveryAddress     VARCHAR(50)             NOT NULL,
    PRIMARY KEY (memberId)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberMonthly (
	memberId		    SERIAL                  NOT NULL,
    subscriptionPrice   NUMERIC(9,2)            NOT NULL,
    startDate           DATE                    NOT NULL,
    dueDate             DATE                    NOT NULL,
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (memberId)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberPayPerView (
	memberId		        SERIAL                NOT NULL,
    film_payperview         INT                   NOT NULL,
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (memberId)
);


CREATE TABLE IF NOT EXISTS NETFLIXDB.CreditCard (
    cardNo              VARCHAR(20)          NOT NULL,
	memberId	        SERIAL               NOT NULL,
    ccv                 INT                  NOT NULL,
    ownerCard           VARCHAR(50)          NOT NULL,
    expirationDate      DATE                 NOT NULL,
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (cardNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Order (
    orderNo             SERIAL                NOT NULL,
    memberId            SERIAL                NOT NULL,
    deliveryPrice       NUMERIC(9, 2)         NOT NULL,
    deliveryDate        DATE                  NOT NULL,
    distance            NUMERIC(9, 2)         NOT NULL,
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (orderNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Movie (
    movieNo         SERIAL                  NOT NULL,
    title           VARCHAR(20)             NOT NULL,
    genre           VARCHAR(20)             NOT NULL,
    productionDate  DATE                    NOT NULL,
    duration        NUMERIC(9,2)            NOT NULL,
    PRIMARY KEY (movieNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Viewing (
    viewNo          SERIAL               NOT NULL,
    movieNo         SERIAL               NOT NULL,
    memberId        SERIAL               NOT NULL,
    viewDate        DATE                 NOT NULL,
    duration        NUMERIC(9, 2)        NOT NULL,
    FOREIGN KEY (memberId) REFERENCES NETFLIXDB.Member(memberId)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (viewNo)
);


CREATE TABLE IF NOT EXISTS NETFLIXDB.DVD (
    DVDNo           SERIAL        NOT NULL,
    orderNo         SERIAL        NOT NULL,
    movieNo         SERIAL        NOT NULL,
    FOREIGN KEY (orderNo) REFERENCES NETFLIXDB.Order(orderNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (DVDNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Person (
    personId        SERIAL                  NOT NULL,
    personName      VARCHAR(20)             NOT NULL,
    age             INT                     NOT NULL,
    sex             CHAR                    DEFAULT 'M' CHECK (sex IN ('M', 'F')),
    nationality     VARCHAR(20),
    PRIMARY KEY (personId)
);

-- J'ai décidé de mettre salaire dans Role étant donné qu'on a une référence vers la personne concernée
CREATE TABLE IF NOT EXISTS NETFLIXDB.Role (
    roleNo          SERIAL                  NOT NULL,
    personId        SERIAL                  NOT NULL,
    salary          NUMERIC(9,2)            NOT NULL,
    PRIMARY KEY (personId)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Ceremony (
    ceremonyNo      SERIAL                  NOT NULL,
    host            VARCHAR(20)             NOT NULL,
    category        VARCHAR(20)             NOT NULL,
    PRIMARY KEY (ceremonyNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Oscar (
    oscarNo         SERIAL                  NOT NULL,
    ceremonyNo      SERIAL                  NOT NULL,
    movieNo         SERIAL                  NOT NULL,
    category        VARCHAR(20)             NOT NULL,
    oscarType       VARCHAR(20)             NOT NULL CHECK (oscarType IN ('Nominee','Winner')),
    FOREIGN KEY (ceremonyNo) REFERENCES NETFLIXDB.Ceremony(ceremonyNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (movieNo) REFERENCES NETFLIXDB.Movie(movieNo)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (oscarNo)
);


