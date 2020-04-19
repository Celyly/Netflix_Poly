SET search_path = 'NETFLIXDB';

DROP SCHEMA IF EXISTS NETFLIXDB CASCADE;
CREATE SCHEMA NETFLIXDB;

CREATE TABLE IF NOT EXISTS NETFLIXDB.Membre (
	idMembre		    VARCHAR(50)             NOT NULL,
    nomMembre           VARCHAR(200)            NOT NULL,
    motDePasse          VARCHAR(500)            NOT NULL, -- Doit être encrypté
    adresseCourriel     VARCHAR(200)            NOT NULL,
    adressePostale      VARCHAR(6)              NOT NULL,
    PRIMARY KEY (idMembre)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.MembreMensuel (
	idMembre		    VARCHAR(50)             NOT NULL,
    prixAbonnement      NUMERIC(9,2)            NOT NULL,
    dateDebut           DATE                    NOT NULL,
    dateEcheance        DATE                    NOT NULL,
    FOREIGN KEY (idMembre) REFERENCES NETFLIXDB.Membre(idMembre)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (idMembre)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.MemberPayPerView (
	idMembre		        VARCHAR(50)           NOT NULL,
    film_payperview         INT                   NOT NULL, -- nombre de films
    FOREIGN KEY (idMembre) REFERENCES NETFLIXDB.Membre(idMembre)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (idMembre)
);


CREATE TABLE IF NOT EXISTS NETFLIXDB.CarteCredit (
    noCarte             VARCHAR(19)          NOT NULL,
	idMembre	        VARCHAR(50)          NOT NULL,
    ccv                 VARCHAR(3)           NOT NULL,
    titulaire           VARCHAR(200)         NOT NULL,
    dateExpiration      DATE                 NOT NULL CHECK (dateExpiration > CURRENT_DATE),
    FOREIGN KEY (idMembre) REFERENCES NETFLIXDB.Membre(idMembre)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (idMembre)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Film (
    noFilm          SERIAL                  NOT NULL,
    titre           VARCHAR(200)            NOT NULL,
    genre           VARCHAR(200)            NOT NULL,
    dateProduction  DATE                    NOT NULL,
    duree           INT                     NOT NULL,
    prix            NUMERIC(9,2)            NOT NULL,
    PRIMARY KEY (noFilm)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Visionnement (
    noVisionnement          SERIAL               NOT NULL,
    noFilm                  SERIAL               NOT NULL,
    idMembre                VARCHAR(50)          NOT NULL,
    dateVisionnement        DATE                 NOT NULL,
    dureeVisionnement       FLOAT(5)             NOT NULL,
    FOREIGN KEY (idMembre) REFERENCES NETFLIXDB.Membre(idMembre)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (noFilm) REFERENCES NETFLIXDB.Film(noFilm)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (noVisionnement)
);


CREATE TABLE IF NOT EXISTS NETFLIXDB.DVD (
    noDVD          SERIAL        NOT NULL,
    noFilm         SERIAL        NOT NULL,
    prixDVD        SERIAL        NOT NULL,
    FOREIGN KEY (noFilm) REFERENCES NETFLIXDB.Film(noFilm)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (noDVD, noFilm)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Commande (
    noCommande      SERIAL                NOT NULL,
    idMembre        VARCHAR(50)           NOT NULL,
    noDVD           SERIAL                NOT NULL,
    noFilm          SERIAL                NOT NULL,
    coutEnvoi       NUMERIC(9, 2)         NOT NULL,
    dateEnvoi       DATE                  NOT NULL,
    -- distance            NUMERIC(9, 2)         NOT NULL,
    FOREIGN KEY (idMembre) REFERENCES NETFLIXDB.Membre(idMembre)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (noDVD, noFilm) REFERENCES NETFLIXDB.DVD(noDVD, noFilm)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (noCommande)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Personne (
    idPersonne          SERIAL                  NOT NULL,
    nomPersonne         VARCHAR(200)            NOT NULL,
    dateNaissance       DATE                    NOT NULL,
    sexe                CHAR                    DEFAULT 'M' CHECK (sexe IN ('M', 'F')),
    nationalite         VARCHAR(200),
    PRIMARY KEY (idPersonne)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Role (
    noRole          SERIAL                  NOT NULL,
    idPersonne      SERIAL                  NOT NULL,
    noFilm          SERIAL                  NOT NULL,
    nomRole         VARCHAR(200)            NOT NULL,
    salaire         NUMERIC(9,2)            NOT NULL,
    FOREIGN KEY (idPersonne) REFERENCES NETFLIXDB.Personne(idPersonne)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (noFilm) REFERENCES NETFLIXDB.Film(noFilm)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (noRole)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Ceremonie (
    noCeremonie     SERIAL                  NOT NULL,
    mc              VARCHAR(200)            NOT NULL,
    location        VARCHAR(200)            NOT NULL,
    PRIMARY KEY (noCeremonie)
);

CREATE TABLE IF NOT EXISTS NETFLIXDB.Oscar (
    code            SERIAL                  NOT NULL,
    noCeremonie     SERIAL                  NOT NULL,
    noFilm          SERIAL                  NOT NULL,
    categorie       VARCHAR(200)            NOT NULL,
    type            VARCHAR(50)             NOT NULL CHECK (type IN ('Nominee','Winner')),
    FOREIGN KEY (noCeremonie) REFERENCES NETFLIXDB.Ceremonie(noCeremonie)
    ON UPDATE CASCADE ON DELETE CASCADE,
    FOREIGN KEY (noFilm) REFERENCES NETFLIXDB.Film(noFilm)
    ON UPDATE CASCADE ON DELETE CASCADE,
    PRIMARY KEY (code)
);
