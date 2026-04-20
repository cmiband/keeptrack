-- Seed data for keeptrack database

-- Task statuses
INSERT INTO public.taskstatus (statusname, statuslabel) VALUES
('todo',        'To Do'),
('in_progress', 'In Progress'),
('review',      'In Review'),
('done',        'Done');

-- Users
INSERT INTO public.users (lastname, firstname, email, username, createddate) VALUES
('Kowalski',   'Jan',       'jan.kowalski@example.com',    'jkowalski',   '2024-01-10'),
('Nowak',      'Anna',      'anna.nowak@example.com',      'anowak',      '2024-01-12'),
('Wisniewski', 'Piotr',     'piotr.wisniewski@example.com','pwisniewski', '2024-01-15'),
('Wojcik',     'Katarzyna', 'katarzyna.wojcik@example.com','kwojcik',     '2024-02-01'),
('Zielinski',  'Marek',     'marek.zielinski@example.com', 'mzielinski',  '2024-02-05');

-- Boards
INSERT INTO public.board (boardname, authorid) VALUES
('Frontend',  1),
('Backend',   2),
('DevOps',    3);

-- Board assignments
INSERT INTO public.boardassignment (boardid, userid) VALUES
(1, 1),
(1, 4),
(2, 2),
(2, 3),
(2, 5),
(3, 3),
(3, 5);

-- Tasks
INSERT INTO public.task (taskname, authorid, description, createddate, targetdate, boardid) VALUES
('Zaprojektuj UI logowania',      1, 'Stwórz ekran logowania',          '2024-03-01', '2024-03-15', 1),
('Implementuj REST API',          2, 'Endpointy dla uzytkownikow',       '2024-03-02', '2024-03-20', 2),
('Skonfiguruj CI/CD',             3, 'Pipeline GitHub Actions',          '2024-03-03', '2024-03-25', 3),
('Napisz testy jednostkowe',      2, 'Pokrycie kodu testami min. 80%',   '2024-03-05', '2024-03-30', 2),
('Optymalizacja zapytan SQL',     2, 'Indeksy i query tuning',           '2024-02-20', '2024-03-01', 2),
('Strona glowna - responsywnosc', 1, 'Mobile first design',              '2024-03-08', '2024-03-18', 1),
('Dokumentacja API',              2, 'Swagger/OpenAPI docs',             '2024-03-10', '2024-04-01', 2);

-- Task assignments
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

-- Task comments
INSERT INTO public.taskcomment (authorid, createddate, commentbody, taskid) VALUES
(1, '2024-03-02', 'Zaczynam prace nad projektem layoutu.',           1),
(4, '2024-03-03', 'Mam kilka pomyslow na UI, wrzuce screenshoty.',   1),
(2, '2024-03-04', 'Endpointy dla /users gotowe, pracuje nad /tasks.',2),
(3, '2024-03-05', 'Pipeline dziala na branch main.',                  3),
(2, '2024-03-06', 'Znalazlem wolne zapytanie N+1, poprawiam.',        5),
(1, '2024-03-09', 'Breakpointy dla mobile dodane.',                   6),
(5, '2024-03-11', 'Zaczynam dokumentacje endpointow auth.',           7);