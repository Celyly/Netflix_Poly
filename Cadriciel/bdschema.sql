SET search_path = 'NETFLIXDB';

DROP SCHEMA IF EXISTS FLOTTEDB CASCADE;
CREATE SCHEMA NETFLIXDB;


CREATE TABLE IF NOT EXISTS NETFLIXDB.Member (
	memberID		    SERIAL                  NOT NULL,
    memberName          VARCHAR(50)             NOT NULL,
    memberPassword      VARCHAR(50)             NOT NULL,
    email               VARCHAR(50)             NOT NULL,
    deliveryAddress     VARCHAR(50)             NOT NULL,
    PRIMARY KEY (memberID)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberMonthly (
	memberID		    SERIAL                  NOT NULL,
    memberName          VARCHAR(50)             NOT NULL,
    memberPassword      VARCHAR(50)             NOT NULL,
    email               VARCHAR(50)             NOT NULL,
    deliveryAddress     VARCHAR(50)             NOT NULL,
    subscriptionPrice   NUMERIC(9,2)            NOT NULL,
    startDate           DATE                    NOT NULL,
    dueDate             DATE                    NOT NULL,
    PRIMARY KEY (memberID)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberPayPerView (
	memberID		            SERIAL                  NOT NULL,
    memberName                  VARCHAR(50)             NOT NULL,
    memberPassword              VARCHAR(50)             NOT NULL,
    email                       VARCHAR(50)             NOT NULL,
    deliveryAddress             VARCHAR(50)             NOT NULL,
    film_payperview             INT                     NOT NULL,
    PRIMARY KEY (memberID)
);


CREATE TABLE IF NOT EXISTS NETFLIXDB.CreditCard (
    cardNo                  VARCHAR(20)             NOT NULL,
    ccv                     INT                     NOT NULL,
    ownerCard               VARCHAR(50)             NOT NULL,
    expirationDate          DATE                    NOT NULL,
	memberID	            SERIAL                  NOT NULL,
    FOREIGN KEY (memberID) REFERENCES NETFLIXDB.Member(memberID)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (cardNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Order (
    orderNo             SERIAL                  NOT NULL,
    memberID            SERIAL                  NOT NULL,
    deliveryPrice       NUMERIC(9, 2)           NOT NULL,
    deliveryDate        DATE                    NOT NULL,
    distance            NUMERIC(9, 2)           NOT NULL,
    FOREIGN KEY (memberID) REFERENCES NETFLIXDB.Member(memberID)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (orderNo)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Viewing (
    viewNo             SERIAL                  NOT NULL,
    memberID           SERIAL                  NOT NULL,
    viewDate           DATE                    NOT NULL,
    duration           NUMERIC(9, 2)           NOT NULL,
    FOREIGN KEY (memberID) REFERENCES NETFLIXDB.Member(memberID)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (viewNo)
);


