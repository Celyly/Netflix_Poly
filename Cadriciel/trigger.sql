CREATE OR REPLACE FUNCTION NETFLIXDB.getPrix(adresse VARCHAR(6))
RETURNS NUMERIC AS $coutEnvoi$
DECLARE coutEnvoi NUMERIC;
DECLARE codePostal VARCHAR;
DECLARE code INTEGER;
DECLARE distance INTEGER;
DECLARE distanceTotale INTEGER;
-- H3T1J4 : Code postal du pavillon Lassonde. C'est de là que les livraisons sont faites.
BEGIN
    SELECT SUBSTRING(adresse from 1 for 2) INTO codePostal;
    IF codePostal = 'H0' THEN SELECT 10 INTO distance; -- Nombre de km de base
    END IF;
    IF codePostal = 'H1' THEN SELECT 7 INTO distance;
    END IF;
    IF codePostal = 'H2' THEN SELECT 4 INTO distance;
    END IF;
    IF codePostal = 'H3' THEN SELECT 0 INTO distance;
    END IF;
    IF codePostal = 'H4' THEN SELECT 4 INTO distance;
    END IF;
    -- Nombre de kms additionnels basés sur la distance d'une lettre de la lettre T (le 3e caractere dans l'adresse d'origine)
    SELECT ABS(ASCII('T') - ASCII(SUBSTRING(adresse, 3, 1))) INTO code;
    SELECT (distance + code) INTO distanceTotale;
    SELECT distanceTotale * 0.4 INTO coutEnvoi; -- 0.4$ / km
    RETURN coutEnvoi;
END;
$coutEnvoi$ LANGUAGE plpgsql;

-- Tester le trigger:

SELECT * FROM NETFLIXDB.getPrix('H3T1J4') AS valeur;
-- Retourne 0
-- Puisque l'adresse est la même que l'adresse d'origine

SELECT * FROM NETFLIXDB.getPrix('H2T2B3') AS valeur;
-- Retourne 1.6
-- (4 + 0)*0.4 = 1.6

SELECT * FROM NETFLIXDB.getPrix('H1K1L7') AS valeur;
-- Retourne 6.4
-- (7 + 9)*0.4 = 6.4