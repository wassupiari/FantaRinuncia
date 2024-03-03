-- Inserimento di dati nella tabella Utente
INSERT INTO Utente (username, password, nome, cognome) VALUES
                                                           ('user1', 'password1', 'Mario', 'Rossi'),
                                                           ('user2', 'password2', 'Giulia', 'Bianchi'),
                                                           ('user3', 'password3', 'Luca', 'Verdi'),
                                                           ('user4', 'password4', 'Anna', 'Neri'),
                                                           ('user5', 'password5', 'Paolo', 'Gialli');

-- Inserimento di dati nella tabella Lega
INSERT INTO Lega (nome, proprietario_id) VALUES
                                             ('Lega Fantacalcio 1', 1),
                                             ('Lega Fantacalcio 2', 2),
                                             ('Lega Fantacalcio 3', 3),
                                             ('Lega Fantacalcio 4', 4),
                                             ('Lega Fantacalcio 5', 5);

-- Inserimento di dati nella tabella Squadra
INSERT INTO Squadra (nome, lega_id) VALUES
                                        ('Squadra A', 1),
                                        ('Squadra B', 2),
                                        ('Squadra C', 3),
                                        ('Squadra D', 4),
                                        ('Squadra E', 5);

-- Inserimento di dati nella tabella Partecipanti_squadra
INSERT INTO Partecipanti_squadra (squadra_id, nome, cognome, punti) VALUES
                                                                        (1, 'Marco', 'Bianchi', 100),
                                                                        (2, 'Paola', 'Rossi', 150),
                                                                        (3, 'Luigi', 'Verdi', 200),
                                                                        (4, 'Giovanna', 'Neri', 180),
                                                                        (5, 'Sofia', 'Gialli', 120);


select * from utente