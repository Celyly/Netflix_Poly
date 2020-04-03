SET search_path = 'NETFLIXDB';


-- 1) Affichez toutes les informations sur un film spécifié par l'utilisateur (selon le titre)


-- 2) Pour chaque genre de film, listez tous les titres de films ainsi que la dernière date à laquelle
--    un film a été acheté (DVD) ou visionné


-- 3) Pour chaque genre de film, trouvez les noms et courriels des membres qui les ont visionnés le
--    plus souvent. Par exemple, Amal Z est le membre qui a visionné le plus de documentaires
--    animaliers


-- 4) Trouvez le nombre total de films groupés par réalisateur
SELECT COUNT(m.movieNo) as nMovies, p.personName
FROM NETFLIXDB.Movie m, NETFLIXDB.Person p, NETFLIXDB.Role r
WHERE p.personId = r.personId AND r.roleNom = 'Réalisateur' AND m.movieNo = r.movieNo
GROUP BY personName


-- 5) Trouvez les noms des membres dont le coût total d’achat de DVD est plus élevé que la
--    moyenne
SELECT DISTINCT m.memberName
FROM NETFLIXDB.Member m, NETFLIXDB.Order o
WHERE m.memberId = o.memberId AND deliveryPrice > (SELECT AVG(deliveryPrice) FROM NETFLIXDB.Order)


-- 6) Ordonnez et retournez les films en termes de quantité totale vendue (DVD) et en nombre de
--    visionnements


-- 7) Trouvez le titre et le prix des films qui n’ont jamais été commandés sous forme de DVD mais
--    qui ont été visionnés plus de 10 fois


-- 8) Trouvez le nom et date de naissance des acteurs qui jouent dans les films qui sont visionnés
--    le plus souvent (soit plus que la moyenne)


-- 9) Trouvez le nom du ou des réalisateurs qui ont réalisé les films qui ont le plus grand nombre
--    de nominations aux oscars. Par exemple, Woody Allen et Steven Spielberg ont réalisé 10
--    films qui ont été nominés aux oscars.


-- 10) Trouvez le nom des réalisateurs qui ont été le plus souvent nominés aux oscars mais qui
--     n’ont jamais gagné d’oscar


-- 11) Trouvez les films (titre, année) qui ont gagné le plus d’oscars. Listez également leur
--     réalisateurs et leurs acteurs ;


-- 12) Quelles paires de femmes québécoises ont le plus souvent travaillé ensemble dans différents
--     films ?


-- 13) Comment a évolué la carrière de Woody Allen ? (On veut connaitre tous ses rôles dans un
--     film (réalisateur, acteur, etc.) du plus ancien au plus récent)