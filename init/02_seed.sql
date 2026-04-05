-- Seed data for keeptrack database

-- Users
INSERT INTO public.users (lastname, firstname, age, email, username, createddate) VALUES
('Kowalski',   'Jan',       28, 'jan.kowalski@example.com',    'jkowalski',   '2024-01-10'),
('Nowak',      'Anna',      32, 'anna.nowak@example.com',      'anowak',      '2024-01-12'),
('Wiśniewski', 'Piotr',     25, 'piotr.wisniewski@example.com','pwisniewski', '2024-01-15'),
('Wójcik',     'Katarzyna', 29, 'katarzyna.wojcik@example.com','kwojcik',     '2024-02-01'),
('Zieliński',  'Marek',     35, 'marek.zielinski@example.com', 'mzielinski',  '2024-02-05');

-- Boards
INSERT INTO public.board (boardname, authorid) VALUES
('Frontend',  1),
('Backend',   2),
('DevOps',    3);

-- Board assignments (kto jest przypisany do którego boardu)
INSERT INTO public.boardassignment (boardid, userid) VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 3),
(2, 5),
(3, 3),
(3, 5);

-- Tasks
INSERT INTO public.task (taskname, authorid, description, status, createddate, targetdate) VALUES
('Zaprojektuj UI logowania',      1, 'Stwórz ekran logowania',         'In Progress', '2024-03-01', '2024-03-15'),
('Implementuj REST API',          2, 'Endpointy dla użytkowników',      'To Do',       '2024-03-02', '2024-03-20'),
('Skonfiguruj CI/CD',             3, 'Pipeline GitHub Actions',         'To Do',       '2024-03-03', '2024-03-25'),
('Napisz testy jednostkowe',      2, 'Pokrycie kodu testami min. 80%',  'To Do',       '2024-03-05', '2024-03-30'),
('Optymalizacja zapytań SQL',     2, 'Indeksy i query tuning',          'Done',        '2024-02-20', '2024-03-01'),
('Strona główna - responsywność', 1, 'Mobile first design',             'In Progress', '2024-03-08', '2024-03-18'),
('Dokumentacja API',              2, 'Swagger/OpenAPI docs',            'To Do',       '2024-03-10', '2024-04-01');

-- Task assignments (kto jest przypisany do którego taska)
INSERT INTO public.taskassignment (taskid, userid) VALUES
(1, 1),
(1, 4),
(2, 2),
(3, 3),
(3, 5),
(4, 4),
(5, 2),
(6, 1),
(7, 5);