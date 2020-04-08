SET search_path = 'NETFLIXDB';


-- 1) Affichez toutes les informations sur un film spécifié par l'utilisateur (selon le titre)
--    Par exemple, l'utilisateur désire afficher les informations sur le film 'The Mini Katana'
SELECT *
FROM NETFLIXDB.Movie
WHERE title = 'The Mini Katana'


-- 2) Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
--    un film a été acheté (DVD) ou visionné
SELECT genre, title, (
SELECT MAX(maxDate)
FROM
    (SELECT MAX(v.viewDate) as maxDate
    FROM NETFLIXDB.Movie movie, NETFLIXDB.Viewing v
    WHERE movie.movieNo = v.movieNo
    GROUP BY movie.movieNo
    HAVING movie.movieNo = m.movieNo
    UNION ALL
    SELECT MAX(o.deliveryDate) as maxDate
    FROM NETFLIXDB.Movie movie, NETFLIXDB.Order o, NETFLIXDB.DVD d
    WHERE o.DVDNo = d.DVDNo AND d.movieNo = movie.movieNo
    GROUP BY movie.movieNo
    HAVING movie.movieNo = m.movieNo) tableDate
    ) recentDate
FROM NETFLIXDB.Movie m


-- 3) Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnés le
--    plus souvent. Par exemple, Amal Z est le membre qui a visionné le plus de documentaires
--    animaliers
SELECT genre, (MODE() WITHIN GROUP (ORDER BY memberName)) as memberName, (MODE() WITHIN GROUP (ORDER BY email)) as email
FROM NETFLIXDB.Member member, NETFLIXDB.Viewing v, NETFLIXDB.Movie m
WHERE v.memberId = member.memberId AND v.movieNo = m.movieNo
GROUP BY genre


-- 4) Trouvez le nombre total de films groupés par réalisateur
SELECT COUNT(m.movieNo) as nbTotalFilms, p.personName as realisateur
FROM NETFLIXDB.Movie m, NETFLIXDB.Person p, NETFLIXDB.Role r
WHERE p.personId = r.personId AND r.roleNom = 'Réalisateur' AND m.movieNo = r.movieNo
GROUP BY personName


-- 5) Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la
--    moyenne
SELECT m.memberName
FROM NETFLIXDB.Member m, NETFLIXDB.Order o, NETFLIXDB.DVD d
WHERE m.memberId = o.memberId AND o.DVDNo = d.DVDNo AND o.movieNo = d.movieNo
GROUP BY m.memberName, m.memberId
HAVING SUM(o.deliveryPrice + d.dvdPrice) >
    (SELECT AVG(shippingPrice + moviePrice) as averagePrice
    FROM
        (SELECT SUM(deliveryPrice) as shippingPrice, SUM(dvdPrice) as moviePrice
        FROM NETFLIXDB.Order o, NETFLIXDB.DVD d
        WHERE o.movieNo = d.movieNo AND o.dvdNo = d.dvdNo
        GROUP BY o.memberId
        ) totalPrice
    )

--**
-- 6) Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de
--    visionnements
-- On s'attend à idFilm | nomFilm | Quantité Totale vendue | Nb visionnement
-- ordonné d'abord par Quantité totale vendue et ensuite par NB visionnement tel qu'indiqué dans l'énoncé. 
-- Il y a un exemple similaire dans les notes de cours sur le type de maison (flat, etc) et le loyer.
SELECT m.movieNo, title, (
SELECT SUM(qte)
FROM
    (SELECT COUNT(*) as qte
    FROM NETFLIXDB.Movie movie, NETFLIXDB.Viewing v
    WHERE (movie.movieNo = v.movieNo)
    GROUP BY movie.movieNo
    HAVING movie.movieNo = m.movieNo
    UNION ALL
    SELECT COUNT(*) as qte
    FROM NETFLIXDB.Movie movie, NETFLIXDB.Order o, NETFLIXDB.DVD d
    WHERE (o.DVDNo = d.DVDNo AND d.movieNo = movie.movieNo AND movie.movieNo = o.movieNo)
    GROUP BY movie.movieNo
    HAVING movie.movieNo = m.movieNo) tableQte
) qteTotal
FROM NETFLIXDB.Movie m
ORDER BY qteTotal


-- 7) Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
--    qui ont été visionnés plus de 10 fois
SELECT m.title, m.price
FROM NETFLIXDB.Movie m, NETFLIXDB.Viewing v
WHERE m.movieNo = v.movieNo
AND 10 < (SELECT COUNT(movie.movieNo)
        FROM NETFLIXDB.Movie movie, NETFLIXDB.Viewing viewing
        WHERE movie.movieNo = viewing.movieNo
        GROUP BY viewing.movieNo
        HAVING viewing.movieNo = m.movieNo)
AND m.movieNo NOT IN (SELECT movie.movieNo 
                       FROM NETFLIXDB.Order o, NETFLIXDB.DVD d, NETFLIXDB.Movie movie
                       WHERE o.DVDNo = d.DVDNo AND d.movieNo = movie.movieNo)
GROUP BY m.movieNo


-- 8) Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnés
--    le plus souvent (soit plus que la moyenne)
SELECT p.personName, p.dateNaissance
FROM NETFLIXDB.Person p, NETFLIXDB.Role r, NETFLIXDB.Viewing v
WHERE p.personId = r.personId AND r.movieNo = v.movieNo
GROUP BY p.personName, p.dateNaissance
HAVING COUNT(v.movieNo) > (
	SELECT AVG(nViews) FROM (
		SELECT Viewing.movieNo, COUNT(Viewing.movieNo) as nViews
		FROM NETFLIXDB.Viewing, NETFLIXDB.Role
		WHERE Role.movieNo = Viewing.movieNo
		GROUP BY Viewing.movieNo
	) as viewTable
)


-- 9) Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
--    de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
--    films qui ont été nominés aux oscars.
SELECT p.personName
FROM NETFLIXDB.Person p, NETFLIXDB.Role r, NETFLIXDB.Oscar o
WHERE p.personId = r.personId AND r.roleNom = 'Réalisateur' AND r.movieNo = o.movieNo
GROUP BY p.personName
HAVING COUNT(o.movieNo) >= (
    SELECT MAX(nNominations) FROM (
        SELECT Oscar.movieNo, COUNT(Oscar.movieNo) as nNominations
        FROM NETFLIXDB.Oscar
        WHERE Oscar.oscarType = 'Nominee'
        GROUP BY Oscar.movieNo
    ) as viewTable
)


-- 10) Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
--     n’ont jamais gagné d’oscar
SELECT p.personName
FROM NETFLIXDB.Person p, NETFLIXDB.Role r
WHERE p.personId = r.personId AND r.roleNom = 'Réalisateur'
GROUP BY p.personName
HAVING COUNT(o.movieNo) >= (
    SELECT MAX(nNominations) FROM (
        SELECT Oscar.movieNo, COUNT(Oscar.movieNo) as nNominations
        FROM NETFLIXDB.Oscar
        WHERE Oscar.oscarType = 'Nominee'
        GROUP BY Oscar.movieNo
    ) as viewTable
)
-- je ne suis pas sure comment vérifié s'ils ont gagné déjà ou non


-- 11) Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
--     réalisateurs et leurs acteurs ;
SELECT m.title, m.productionDate, p.personName
FROM NETFLIXDB.Movie m, NETFLIXDB.Person p, NETFLIXDB.Role r, NETFLIXDB.Oscar o
WHERE p.personId = r.personId AND r.movieNo = m.movieNo AND m.movieNo = o.MovieNo AND o.oscarType = 'Winner'
GROUP BY m.title, m.productionDate, p.personName
HAVING COUNT(o.movieNo) >= (
    SELECT MAX(nWins) FROM (
        SELECT Oscar.movieNo, COUNT(Oscar.movieNo) as nWins
        FROM NETFLIXDB.Oscar
        WHERE Oscar.oscarType = 'Winner'
        GROUP BY Oscar.movieNo
    ) as viewTable
)


-- 12) Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
--     films ?
SELECT p1.personName
FROM NETFLIXDB.Person p1, NETFLIXDB.Person p2, NETFLIXDB.Role r1, NETFLIXDB.Role r2
WHERE p1.sex = 'F' AND p2.sex = 'F'
AND p1.nationality = 'Québécoise' AND p2.nationality = 'Québécoise'
AND p1.personId != p2.personId
AND r1.personId = p1.personId AND r2.personId = r2.personID
AND r1.movieNo = r2.movieNo
GROUP BY p1.personName
-- ahaha ça donne la bonne réponse mais je pense pas que c'est bon ahahahahahahahahahaha


-- 13) Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
--     film (réalisateur, acteur, etc.) du plus ancien au plus récent)
SELECT m.productionDate, m.title, p.personName, r.roleNom
FROM NETFLIXDB.Person p, NETFLIXDB.Role r, NETFLIXDB.Movie m
WHERE p.personName = 'Woody Allen' AND p.personId = r.personId AND r.movieNo = m.movieNo
GROUP BY m.productionDate, m.title, p.personName, r.roleNom
ORDER BY m.productionDate