SET search_path = 'NETFLIXDB';

INSERT INTO NETFLIXDB.Member VALUES ('member01', 'Phineas Flynn', 'agentperry', 'phineas1999@trimail.com', 'H4K2B6');
INSERT INTO NETFLIXDB.Member VALUES ('member02', 'Ferb Fletcher', 'gitchigoo', 'ferbfletcher@trimail.com', 'H4K2B6');
INSERT INTO NETFLIXDB.Member VALUES ('member03', 'Candance Flynn', 'jeremy', 'ribbonsrcool@hotmail.com', 'H3C1E8');
INSERT INTO NETFLIXDB.Member VALUES ('member04', 'Perry The Platypus', 'krrrrr', 'agentp@owca.com', 'H3H1X2');
INSERT INTO NETFLIXDB.Member VALUES ('member05', 'Heinz Doofenshmirtz', 'passwordinator', 'heinzinator@evil.inc', 'H2W2N4');
INSERT INTO NETFLIXDB.Member VALUES ('member06', 'Isabella Garcia-Shapiro', 'ilovephineas', 'izzyshapiro@fireside.com', 'H2J1L7');

INSERT INTO NETFLIXDB.MemberMonthly VALUES ('member03', 5, '2016-05-19', '2020-04-20');
INSERT INTO NETFLIXDB.MemberMonthly VALUES ('member05', 9, '2014-09-23', '2020-04-25');
INSERT INTO NETFLIXDB.MemberMonthly VALUES ('member06', 2, '2020-03-04', '2020-04-05');

INSERT INTO NETFLIXDB.MemberPayPerView VALUES ('member01', 5);
INSERT INTO NETFLIXDB.MemberPayPerView VALUES ('member02', 5);
INSERT INTO NETFLIXDB.MemberPayPerView VALUES ('member04', 8);

INSERT INTO NETFLIXDB.CreditCard VALUES ('1234-1234-1234-1234', 'member01', 453, 'Linda Flynn-Fletcher', '2022-09-01');
INSERT INTO NETFLIXDB.CreditCard VALUES ('4321-4321-4321-4321', 'member02', 891, 'Lawrence Fletcher', '2021-05-01');
INSERT INTO NETFLIXDB.CreditCard VALUES ('5373-6956-4676-6588', 'member03', 232, 'Candace Flynn', '2023-10-01');
INSERT INTO NETFLIXDB.CreditCard VALUES ('7377-9843-7528-9787', 'member04', 007, 'Perry P', '2022-07-01');
INSERT INTO NETFLIXDB.CreditCard VALUES ('3845-4626-7767-2833', 'member05', 317, 'Heinz Doofenshmirtz', '2020-12-01');
INSERT INTO NETFLIXDB.CreditCard VALUES ('1234-5678-9101-1120', 'member06', 453, 'Vivian Garcia-Shapiro', '2024-03-01');

INSERT INTO NETFLIXDB.Order VALUES (DEFAULT, 'member05', 5, '2020-01-28');
INSERT INTO NETFLIXDB.Order VALUES (DEFAULT, 'member05', 5, '2020-02-04');
INSERT INTO NETFLIXDB.Order VALUES (DEFAULT, 'member05', 5, '2020-03-12');
INSERT INTO NETFLIXDB.Order VALUES (DEFAULT, 'member05', 5, '2020-03-19');
INSERT INTO NETFLIXDB.Order VALUES (DEFAULT, 'member04', 6, '2020-02-08');
INSERT INTO NETFLIXDB.Order VALUES (DEFAULT, 'member04', 6, '2020-03-21');
INSERT INTO NETFLIXDB.Order VALUES (DEFAULT, 'member03', 8, '2020-03-16');
INSERT INTO NETFLIXDB.Order VALUES (DEFAULT, 'member06', 7, '2020-01-17');

INSERT INTO NETFLIXDB.Movie VALUES (DEFAULT, 'The Mini Katana', 'Gore', '1982-01-08', 98);
INSERT INTO NETFLIXDB.Movie VALUES (DEFAULT, 'The Peculiar Case of Adam Sandler', 'Comédie', '2004-05-22', 86);
INSERT INTO NETFLIXDB.Movie VALUES (DEFAULT, 'My Best Friend Hates My Cat', 'Animation', '2008-09-17', 91);
INSERT INTO NETFLIXDB.Movie VALUES (DEFAULT, 'Caillou''s Misfortune', 'Coming-Of-Age', '2018-07-15', 116);
INSERT INTO NETFLIXDB.Movie VALUES (DEFAULT, 'Time Is Forever', 'Romance', '2012-02-14', 105);
INSERT INTO NETFLIXDB.Movie VALUES (DEFAULT, 'Finding Roxanne', 'Romance', '2007-04-30', 110);
INSERT INTO NETFLIXDB.Movie VALUES (DEFAULT, 'The Prince''s PowerPoint Presentation', 'Drame', '1997-11-24', 123);

INSERT INTO NETFLIXDB.Viewing VALUES (DEFAULT, 5, 'member03', '2019-12-18', 67);
INSERT INTO NETFLIXDB.Viewing VALUES (DEFAULT, 5, 'member04', '2020-02-14', 105);
INSERT INTO NETFLIXDB.Viewing VALUES (DEFAULT, 6, 'member04', '2020-03-02', 106);
INSERT INTO NETFLIXDB.Viewing VALUES (DEFAULT, 7, 'member02', '2019-08-30', 121);
INSERT INTO NETFLIXDB.Viewing VALUES (DEFAULT, 3, 'member06', '2020-03-29', 34);

INSERT INTO NETFLIXDB.DVD VALUES (DEFAULT, 1, 1);
INSERT INTO NETFLIXDB.DVD VALUES (DEFAULT, 2, 2);
INSERT INTO NETFLIXDB.DVD VALUES (DEFAULT, 3, 3);
INSERT INTO NETFLIXDB.DVD VALUES (DEFAULT, 4, 4);

INSERT INTO NETFLIXDB.Person VALUES (DEFAULT, 'Woody Allen', '1935-12-01', 'M', 'Américain');
INSERT INTO NETFLIXDB.Person VALUES (DEFAULT, 'Dylan Batista', '1998-05-09', 'M', 'Québécois');
INSERT INTO NETFLIXDB.Person VALUES (DEFAULT, 'Céline Ly', '1999-02-28', 'F', 'Québécoise');
INSERT INTO NETFLIXDB.Person VALUES (DEFAULT, 'Helena Ton-That', '1999-09-29', 'F', 'Québécoise');
INSERT INTO NETFLIXDB.Person VALUES (DEFAULT, 'Behrt Behrnolds', '1978-10-23', 'M', 'Australien');
INSERT INTO NETFLIXDB.Person VALUES (DEFAULT, 'Francine Françoise', '1981-07-27', 'F', 'Française');

INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 'Réalisateur', 38750);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 'Réalisateur', 400345);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 'Acteur', 930000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 'Réalisateur', 2035000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 3, 'Acteur', 95000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 4, 'Acteur', 89000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 5, 'Éditeur', 26000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 2, 'Animateur', 34000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 6, 'Acteur', 180000);

INSERT INTO NETFLIXDB.Ceremony VALUES (DEFAULT, 'Jimmy Fallon');
INSERT INTO NETFLIXDB.Ceremony VALUES (DEFAULT, 'Jimmy Kimmel');
INSERT INTO NETFLIXDB.Ceremony VALUES (DEFAULT, 'Jimmy Neutron');
INSERT INTO NETFLIXDB.Ceremony VALUES (DEFAULT, 'Jimmy Fallon');

INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 1, 7, 'Drame', 'Winner');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 1, 7, 'Musique', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 3, 'Animation', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 6, 'Romance', 'Winner');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 3, 5, 'Romance', 'Winner');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 4, 4, 'Drame', 'Nominee');
