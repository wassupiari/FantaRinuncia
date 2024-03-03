CREATE SCHEMA fantarinuncia;
DO $$
    BEGIN
        IF EXISTS (
            SELECT 1
            FROM information_schema.schemata
            WHERE schema_name = 'fantarinuncia'
        ) THEN
            EXECUTE 'DROP SCHEMA fantarinuncia CASCADE';
        END IF;
    END $$;

SET schema 'fantarinuncia';


create table Utente(
    id SERIAL PRIMARY KEY,
    username VARCHAR(20) UNIQUE NOT NULL,
    password VARCHAR(12) NOT NULL,
    nome VARCHAR(20) NOT NULL,
    cognome VARCHAR(30) NOT NULL,
    data_registrazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

create table lega(
     id SERIAL PRIMARY KEY,
     nome VARCHAR(100) NOT NULL,
     proprietario_id INT NOT NULL,
     data_creazione TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
     FOREIGN KEY (proprietario_id) REFERENCES Utente(id)
);

create table squadra(
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    lega_id INT NOT NULL,
    punteggio INT DEFAULT 0,
    FOREIGN KEY (lega_id) REFERENCES Lega(id)
);

CREATE TABLE partecipanti_squadra (
    squadra_id INT NOT NULL,
    nome VARCHAR(20) NOT NULL,
    cognome VARCHAR(30) NOT NULL,
    punti INT DEFAULT 0 NOT NULL,
    PRIMARY KEY (squadra_id),
    FOREIGN KEY (squadra_id) REFERENCES Squadra(id)
);
