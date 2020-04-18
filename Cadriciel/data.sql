SET search_path = 'NETFLIXDB';

-- INSERT INTO NETFLIXDB.Membre VALUES ('admin01', 'Admin', 'admin', 'admin@netflixpoly.com', 'H4H2P6');
-- INSERT INTO NETFLIXDB.Membre VALUES ('member01', 'Phineas Flynn', 'agentperry', 'phineas1999@trimail.com', 'H4K2B6');
-- INSERT INTO NETFLIXDB.Membre VALUES ('member02', 'Ferb Fletcher', 'gitchigoo', 'ferbfletcher@trimail.com', 'H4K2B6');
-- INSERT INTO NETFLIXDB.Membre VALUES ('member03', 'Candance Flynn', 'jeremy', 'ribbonsrcool@hotmail.com', 'H3C1E8');
-- INSERT INTO NETFLIXDB.Membre VALUES ('member04', 'Perry The Platypus', 'krrrrr', 'agentp@owca.com', 'H3H1X2');
-- INSERT INTO NETFLIXDB.Membre VALUES ('member05', 'Heinz Doofenshmirtz', 'passwordinator', 'heinzinator@evil.inc', 'H2W2N4');
-- INSERT INTO NETFLIXDB.Membre VALUES ('member06', 'Isabella Garcia-Shapiro', 'ilovephineas', 'izzyshapiro@fireside.com', 'H2J1L7');
-- password123

INSERT INTO NETFLIXDB.Membre VALUES ('admin01', 'Admin', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'admin@netflixpoly.com', 'H4H2P6');
INSERT INTO NETFLIXDB.Membre VALUES ('member01', 'Phineas Flynn', '162ddfb0027fd6df06301425f6aa5fca4e0fc60a2497b1eb1cf90b8a011fe1a7', 'phineas1999@trimail.com', 'H4K2B6');
INSERT INTO NETFLIXDB.Membre VALUES ('member02', 'Ferb Fletcher', 'efa406e9784da1feedc52ab578ebcede86d6c90b447267976136c4d2d25fe84a', 'ferbfletcher@trimail.com', 'H4K2B6');
INSERT INTO NETFLIXDB.Membre VALUES ('member03', 'Candance Flynn', '73ecb4b9d82c620a68d517119881d21eaaf808307da44ea47836893e551f9d51', 'ribbonsrcool@hotmail.com', 'H3C1E8');
INSERT INTO NETFLIXDB.Membre VALUES ('member04', 'Perry The Platypus', '23731fa9133fb2f42085cf64044c554b0f2ef468f6fe02f19e95205672001782', 'agentp@owca.com', 'H3H1X2');
INSERT INTO NETFLIXDB.Membre VALUES ('member05', 'Heinz Doofenshmirtz', '1d0b3b8ab8f46610a8784061a5e47558beb1dc2c02829fb1f00c2ef65d7aca0a', 'heinzinator@evil.inc', 'H2W2N4');
INSERT INTO NETFLIXDB.Membre VALUES ('member06', 'Isabella Garcia-Shapiro', 'a8b4ae7797b8b55be4bd24c8a002471c4cb7049e04d28a1f0274d05202d7a44b', 'izzyshapiro@fireside.com', 'H2J1L7');
INSERT INTO NETFLIXDB.Membre VALUES ('member07', 'Vanessa Doofenshmirtz', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'youaregoingtobe@busted.com', 'H2K1L7');
INSERT INTO NETFLIXDB.Membre VALUES ('member08', 'Major Monogram', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'major@topsecret.com', 'H4K1L7');
INSERT INTO NETFLIXDB.Membre VALUES ('member09', 'Jeremy Johnson', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'guitarlover@hotmail.com', 'H2S1P7');
INSERT INTO NETFLIXDB.Membre VALUES ('member10', 'Baljeet Tjinder', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', '123@hotmail.com', 'H2P1L7');
INSERT INTO NETFLIXDB.Membre VALUES ('member11', 'Buford V. Stomm', 'ef92b778bafe771e89245b89ecbc08a44a4e166c06659911881f383d4473e94f', 'bully@yahoo.com', 'H2M1L7');


INSERT INTO NETFLIXDB.MembreMensuel VALUES ('member03', 5, '2016-05-19', '2020-04-20');
INSERT INTO NETFLIXDB.MembreMensuel VALUES ('member05', 9, '2014-09-23', '2020-04-25');
INSERT INTO NETFLIXDB.MembreMensuel VALUES ('member06', 2, '2020-03-04', '2020-04-05');
INSERT INTO NETFLIXDB.MembreMensuel VALUES ('member07', 2, '2020-03-04', '2020-04-05');
INSERT INTO NETFLIXDB.MembreMensuel VALUES ('member08', 2, '2020-03-04', '2020-04-05');
INSERT INTO NETFLIXDB.MembreMensuel VALUES ('member09', 2, '2020-03-04', '2020-04-05');


INSERT INTO NETFLIXDB.MemberPayPerView VALUES ('member01', 5);
INSERT INTO NETFLIXDB.MemberPayPerView VALUES ('member02', 5);
INSERT INTO NETFLIXDB.MemberPayPerView VALUES ('member04', 8);
INSERT INTO NETFLIXDB.MemberPayPerView VALUES ('member10', 8);
INSERT INTO NETFLIXDB.MemberPayPerView VALUES ('member11', 8);


INSERT INTO NETFLIXDB.CarteCredit VALUES ('1234-1234-1234-1234', 'member01', '453', 'Linda Flynn-Fletcher', '2022-09-01');
INSERT INTO NETFLIXDB.CarteCredit VALUES ('4321-4321-4321-4321', 'member02', '891', 'Lawrence Fletcher', '2021-05-01');
INSERT INTO NETFLIXDB.CarteCredit VALUES ('5373-6956-4676-6588', 'member03', '232', 'Candace Flynn', '2023-10-01');
INSERT INTO NETFLIXDB.CarteCredit VALUES ('7377-9843-7528-9787', 'member04', '007', 'Perry P', '2022-07-01');
INSERT INTO NETFLIXDB.CarteCredit VALUES ('3845-4626-7767-2833', 'member05', '317', 'Heinz Doofenshmirtz', '2020-12-01');
INSERT INTO NETFLIXDB.CarteCredit VALUES ('1234-5678-9101-1120', 'member06', '453', 'Vivian Garcia-Shapiro', '2024-03-01');

INSERT INTO NETFLIXDB.Film VALUES (DEFAULT, 'The Mini Katana', 'Gore', '1982-01-08', 98, 5);
INSERT INTO NETFLIXDB.Film VALUES (DEFAULT, 'The Peculiar Case of Adam Sandler', 'Comedy', '2004-05-22', 86, 6);
INSERT INTO NETFLIXDB.Film VALUES (DEFAULT, 'My Best Friend Hates My Cat', 'Animation', '2008-09-17', 91, 7);
INSERT INTO NETFLIXDB.Film VALUES (DEFAULT, 'Caillous Misfortune', 'Coming-Of-Age', '2018-07-15', 116, 3);
INSERT INTO NETFLIXDB.Film VALUES (DEFAULT, 'Time Is Forever', 'Romance', '2012-02-14', 105, 9);
INSERT INTO NETFLIXDB.Film VALUES (DEFAULT, 'Finding Roxanne', 'Romance', '2007-04-30', 110, 10);
INSERT INTO NETFLIXDB.Film VALUES (DEFAULT, 'The Princes PowerPoint Presentation', 'Drame', '1997-11-24', 123, 15);

INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'admin01', '2019-12-18', 107);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member01', '2019-12-18', 67);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member02', '2019-12-18', 67);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member03', '2019-12-18', 67);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member04', '2020-02-14', 105);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member05', '2019-03-14', 85);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member06', '2019-12-10', 100);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member07', '2019-11-14', 105);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member08', '2019-12-14', 105);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member09', '2020-01-14', 75);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member10', '2020-02-14', 105);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 5, 'member11', '2020-03-14', 95);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'admin01', '2019-11-29', 94);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member01', '2019-03-29', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member02', '2019-04-29', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member03', '2019-05-29', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member04', '2019-03-02', 106);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member05', '2019-07-29', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member06', '2020-02-22', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member07', '2019-09-29', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member08', '2019-11-29', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member09', '2020-12-29', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 6, 'member10', '2019-12-29', 34);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 7, 'member02', '2019-08-30', 121);
INSERT INTO NETFLIXDB.Visionnement VALUES (DEFAULT, 3, 'member06', '2020-03-29', 34);


INSERT INTO NETFLIXDB.DVD VALUES (DEFAULT, 1, 15);
INSERT INTO NETFLIXDB.DVD VALUES (1, 2, 15);
INSERT INTO NETFLIXDB.DVD VALUES (DEFAULT, 2, 15);
INSERT INTO NETFLIXDB.DVD VALUES (DEFAULT, 3, 16);
INSERT INTO NETFLIXDB.DVD VALUES (DEFAULT, 4, 18);

INSERT INTO NETFLIXDB.Commande VALUES (DEFAULT, 'member05', 1, 1, 5, '2020-01-28');
INSERT INTO NETFLIXDB.Commande VALUES (DEFAULT, 'member02', 1, 1, 5, '2020-02-04');
INSERT INTO NETFLIXDB.Commande VALUES (DEFAULT, 'member05', 2, 2, 5, '2020-03-12');
INSERT INTO NETFLIXDB.Commande VALUES (DEFAULT, 'member01', 2, 2, 5, '2020-03-19');
INSERT INTO NETFLIXDB.Commande VALUES (DEFAULT, 'member03', 3, 3, 6, '2020-02-08');
INSERT INTO NETFLIXDB.Commande VALUES (DEFAULT, 'member03', 4, 4, 8, '2020-03-16');
INSERT INTO NETFLIXDB.Commande VALUES (DEFAULT, 'member06', 4, 4, 7, '2020-01-17');

INSERT INTO NETFLIXDB.Personne VALUES (DEFAULT, 'Woody Allen', '1935-12-01', 'M', 'Américain');
INSERT INTO NETFLIXDB.Personne VALUES (DEFAULT, 'Dylan Batista', '1998-05-09', 'M', 'Québécois');
INSERT INTO NETFLIXDB.Personne VALUES (DEFAULT, 'Céline Ly', '1999-02-28', 'F', 'Québécois');
INSERT INTO NETFLIXDB.Personne VALUES (DEFAULT, 'Helena Ton-That', '1999-09-29', 'F', 'Québécois');
INSERT INTO NETFLIXDB.Personne VALUES (DEFAULT, 'Behrt Behrnolds', '1978-10-23', 'M', 'Australien');
INSERT INTO NETFLIXDB.Personne VALUES (DEFAULT, 'Francine Françoise', '1981-07-27', 'F', 'Français');

INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 1, 'Réalisateur', 38750);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 2, 'Réalisateur', 400345);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 3, 'Réalisateur', 2035000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 7, 'Réalisateur', 500125);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 1, 7, 'Acteur', 930000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 2, 4, 'Réalisateur', 152000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 2, 6, 'Animateur', 34000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 3, 3, 'Acteur', 95000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 3, 3, 'Réalisateur', 165000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 4, 3, 'Réalisateur', 45000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 4, 4, 'Acteur', 89000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 5, 5, 'Éditeur', 26000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 5, 7, 'Acteur', 120000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 6, 5, 'Réalisateur', 180000);
INSERT INTO NETFLIXDB.Role VALUES (DEFAULT, 6, 7, 'Acteur', 180000);


INSERT INTO NETFLIXDB.Ceremonie VALUES (DEFAULT, 'Jimmy Fallon', 'Beverly Hills');
INSERT INTO NETFLIXDB.Ceremonie VALUES (DEFAULT, 'Jimmy Kimmel', 'Beverly Hills');
INSERT INTO NETFLIXDB.Ceremonie VALUES (DEFAULT, 'Jimmy Neutron', 'Beverly Hills');
INSERT INTO NETFLIXDB.Ceremonie VALUES (DEFAULT, 'Jimmy Fallon', 'Beverly Hills');

INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 1, 7, 'Best Actor', 'Winner');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 1, 7, 'Best Costume Design', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 1, 7, 'Best Director', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 3, 'Best Animated Feature', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 3, 'Best Original Song', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 3, 'Best Visual Effects', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 3, 'Best Picture', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 4, 'Best Actor', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 6, 'Best Supporting Actress', 'Winner');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 2, 7, 'Best Original Story', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 3, 5, 'Best Actress', 'Winner');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 4, 4, 'Best Picture', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 4, 4, 'Best Costume Design', 'Nominee');
INSERT INTO NETFLIXDB.Oscar VALUES (DEFAULT, 4, 4, 'Best Director', 'Nominee');
