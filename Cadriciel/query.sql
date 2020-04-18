SET search_path = 'NETFLIXDB';


-- 1) Affichez toutes les informations sur un film spécifié par l'utilisateur (selon le titre)
--    Par exemple, l'utilisateur désire afficher les informations sur le film 'The Mini Katana'
SELECT *
FROM NETFLIXDB.Film
WHERE titre = 'The Mini Katana'


-- 2) Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
--    un film a été acheté (DVD) ou visionné
SELECT genre, titre, (
SELECT MAX(maxDate)
FROM
    (SELECT MAX(v.dateVisionnement) as maxDate
    FROM NETFLIXDB.Film film, NETFLIXDB.Visionnement v
    WHERE film.noFilm = v.noFilm
    GROUP BY film.noFilm
    HAVING film.noFilm = f.noFilm
    UNION ALL
    SELECT MAX(c.dateEnvoi) as maxDate
    FROM NETFLIXDB.Film film, NETFLIXDB.Commande c, NETFLIXDB.DVD d
    WHERE c.noDVD = d.noDVD AND d.noFilm = film.noFilm
    GROUP BY film.noFilm
    HAVING film.noFilm = f.noFilm) tableDate
    ) recentDate
FROM NETFLIXDB.Film f


-- 3) Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnés le
--    plus souvent. Par exemple, Amal Z est le membre qui a visionné le plus de documentaires
--    animaliers
SELECT genre, (MODE() WITHIN GROUP (ORDER BY nomMembre)) as nomMembre, (MODE() WITHIN GROUP (ORDER BY adresseCourriel)) as adresseCourriel
FROM NETFLIXDB.Membre member, NETFLIXDB.Visionnement v, NETFLIXDB.Film f
WHERE v.idMembre = member.idMembre AND v.noFilm = f.noFilm
GROUP BY genre


-- 4) Trouvez le nombre total de films groupés par réalisateur
SELECT COUNT(f.noFilm) as nbTotalFilms, p.nomPersonne as realisateur
FROM NETFLIXDB.Film f, NETFLIXDB.Personne p, NETFLIXDB.Role r
WHERE p.idPersonne = r.idPersonne AND r.nomRole = 'Réalisateur' AND f.noFilm = r.noFilm
GROUP BY nomPersonne


-- 5) Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la
--    moyenne
SELECT m.nomMembre
FROM NETFLIXDB.Membre m, NETFLIXDB.Commande c, NETFLIXDB.DVD d
WHERE m.idMembre = c.idMembre AND c.noDVD = d.noDVD AND c.noFilm = d.noFilm
GROUP BY m.nomMembre, m.idMembre
HAVING SUM(c.coutEnvoi + d.prixDVD) >
    (SELECT AVG(shippingPrice + moviePrice) as averagePrice
    FROM
        (SELECT SUM(coutEnvoi) as shippingPrice, SUM(prixDVD) as moviePrice
        FROM NETFLIXDB.Commande c, NETFLIXDB.DVD d
        WHERE c.noFilm = d.noFilm AND c.noDVD = d.noDVD
        GROUP BY c.idMembre
        ) totalPrice
    )


-- 6) Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de
--    visionnements
SELECT f.titre, f.noFilm,
	(SELECT COUNT(*) as qte
    FROM NETFLIXDB.Film film, NETFLIXDB.Commande c, NETFLIXDB.DVD d
    WHERE (c.noDVD = d.noDVD AND d.noFilm = film.noFilm AND film.noFilm = c.noFilm)
	GROUP BY film.noFilm
	HAVING film.noFilm = f.noFilm) as orderTotal,
	(SELECT COUNT(*) as qte
    FROM NETFLIXDB.Film film, NETFLIXDB.Visionnement v
    WHERE (film.noFilm = v.noFilm)
    GROUP BY film.noFilm
 	HAVING film.noFilm = f.noFilm) as viewTotal
FROM NETFLIXDB.Film f
ORDER BY orderTotal, viewTotal


-- 7) Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
--    qui ont été visionnés plus de 10 fois
SELECT f.titre, f.prix
FROM NETFLIXDB.Film f, NETFLIXDB.Visionnement v
WHERE f.noFilm = v.noFilm
AND 10 < (SELECT COUNT(film.noFilm)
        FROM NETFLIXDB.Film film, NETFLIXDB.Visionnement visionnement
        WHERE film.noFilm = visionnement.noFilm
        GROUP BY visionnement.noFilm
        HAVING visionnement.noFilm = f.noFilm)
AND f.noFilm NOT IN (SELECT film.noFilm 
                       FROM NETFLIXDB.Commande c, NETFLIXDB.DVD d, NETFLIXDB.Film film
                       WHERE c.noDVD = d.noDVD AND d.noFilm = film.noFilm)
GROUP BY f.noFilm


-- 8) Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnés
--    le plus souvent (soit plus que la moyenne)

SELECT p.nomPersonne, p.dateNaissance
FROM NETFLIXDB.Personne p, NETFLIXDB.Role r, NETFLIXDB.Visionnement v, NETFLIXDB.Film f
WHERE p.idPersonne = r.idPersonne AND r.noFilm = v.noFilm AND r.nomRole = 'Acteur' 
AND (SELECT COUNT(Visionnement.noFilm) as nViews
	FROM NETFLIXDB.Visionnement, NETFLIXDB.Role
	WHERE Role.noFilm = Visionnement.noFilm AND f.noFilm = Visionnement.noFilm
	GROUP BY Visionnement.noFilm) > 
        (SELECT AVG(nViews) FROM 
            (SELECT Visionnement.noFilm, COUNT(Visionnement.noFilm) as nViews
             FROM NETFLIXDB.Visionnement, NETFLIXDB.Role
             WHERE Role.noFilm = Visionnement.noFilm
             GROUP BY Visionnement.noFilm
            ) as viewTable
)
GROUP BY p.nomPersonne, p.dateNaissance


-- 9) Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
--    de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
--    films qui ont été nominés aux oscars. 
--    (On inclut également les gagnants comme une nominations aux oscars puisqu'avant de devenir un gagnant, il faut être nominé)

SELECT p.nomPersonne
FROM NETFLIXDB.Personne p, NETFLIXDB.Role r, NETFLIXDB.Oscar o
WHERE p.idPersonne = r.idPersonne AND r.nomRole = 'Réalisateur' AND r.noFilm = o.noFilm
GROUP BY p.nomPersonne
HAVING COUNT(o.noFilm) >= (
    SELECT MAX(nNominations) FROM
		(SELECT COUNT(Oscar.noFilm) as nNominations
		FROM NETFLIXDB.Oscar, NETFLIXDB.Film
		WHERE Oscar.noFilm = Film.noFilm
		GROUP BY Film.noFilm
		) as nominationTable
)



-- 10) Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
--     n’ont jamais gagné d’oscar

SELECT p.nomPersonne
FROM NETFLIXDB.Personne p, NETFLIXDB.Role r, NETFLIXDB.Oscar o
WHERE p.idPersonne = r.idPersonne AND r.nomRole = 'Réalisateur' AND r.noFilm = o.noFilm
GROUP BY p.nomPersonne, p.idPersonne
HAVING COUNT(o.noFilm) >= (
    SELECT MAX(nNominations) FROM
        (SELECT COUNT(Oscar.noFilm) as nNominations
        FROM NETFLIXDB.Oscar, NETFLIXDB.Film
        WHERE Oscar.noFilm = Film.noFilm AND Oscar.type = 'Nominee'
        GROUP BY Film.noFilm
        ) as nomineesTable
) AND p.idPersonne NOT IN
	(SELECT Personne.idPersonne
	 FROM NETFLIXDB.Oscar, NETFLIXDB.Film, NETFLIXDB.Personne, NETFLIXDB.Role
	 WHERE Oscar.noFilm = Film.noFilm AND Oscar.type = 'Winner' 
         AND Personne.idPersonne = Role.idPersonne AND Role.nomRole = 'Réalisateur' 
         AND Role.noFilm = Oscar.noFilm
	)


-- 11) Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
--     réalisateurs et leurs acteurs ;
SELECT f.titre, f.dateProduction, p.nomPersonne, r.nomRole
FROM NETFLIXDB.Film f, NETFLIXDB.Personne p, NETFLIXDB.Role r, NETFLIXDB.Oscar o
WHERE p.idPersonne = r.idPersonne AND r.noFilm = f.noFilm AND f.noFilm = o.noFilm AND o.type = 'Winner'
GROUP BY f.titre, f.dateProduction, p.nomPersonne, r.nomRole
HAVING COUNT(o.noFilm) >= (
    SELECT MAX(nWins) FROM (
        SELECT Oscar.noFilm, COUNT(Oscar.noFilm) as nWins
        FROM NETFLIXDB.Oscar
        WHERE Oscar.type = 'Winner'
        GROUP BY Oscar.noFilm
    ) as viewTable
) AND r.nomRole IN ('Réalisateur', 'Acteur')


-- 12) Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
--     films ?
SELECT p1.nomPersonne, p2.nomPersonne
FROM NETFLIXDB.Personne p1, NETFLIXDB.Personne p2, NETFLIXDB.Role r1, NETFLIXDB.Role r2
WHERE p1.sexe = 'F' AND p2.sexe = 'F'
AND p1.nationalite = 'Québécois' AND p2.nationalite = 'Québécois'
AND p1.idPersonne != p2.idPersonne
AND r1.idPersonne = p1.idPersonne AND r2.idPersonne = r2.idPersonne
AND r1.noFilm = r2.noFilm
GROUP BY p1.nomPersonne, p2.nomPersonne


-- 13) Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
--     film (réalisateur, acteur, etc.) du plus ancien au plus récent)
SELECT f.dateProduction, f.titre, p.nomPersonne, r.nomRole
FROM NETFLIXDB.Personne p, NETFLIXDB.Role r, NETFLIXDB.Film f
WHERE p.nomPersonne = 'Woody Allen' AND p.idPersonne = r.idPersonne AND r.noFilm = f.noFilm
GROUP BY f.dateProduction, f.titre, p.nomPersonne, r.nomRole
ORDER BY f.dateProduction