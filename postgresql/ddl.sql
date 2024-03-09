drop schema if exists fantarinuncia cascade;
CREATE SCHEMA fantarinuncia;




SET schema 'fantarinuncia';


CREATE TABLE utente (
                        id serial PRIMARY KEY,
                        username varchar(20) NOT NULL UNIQUE,
                        password varchar(60) NOT NULL,
                        nome varchar(20) NOT NULL,
                        cognome varchar(30) NOT NULL,
                        data_registrazione timestamp DEFAULT CURRENT_TIMESTAMP,
                        immagine_profilo bytea DEFAULT NULL
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
