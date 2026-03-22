--
-- PostgreSQL database dump
--

\restrict I7gcmyrxMb195yQNTAZj34egRNaD368ueLOASmGbjdTqULensdr8tuOVW6actPG

-- Dumped from database version 18.3 (Debian 18.3-1.pgdg13+1)
-- Dumped by pg_dump version 18.3 (Debian 18.3-1.pgdg13+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: board; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.board (
    boardid integer NOT NULL,
    boardname character varying(255),
    authorid integer NOT NULL
);


ALTER TABLE public.board OWNER TO postgres;

--
-- Name: board_boardid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.board_boardid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.board_boardid_seq OWNER TO postgres;

--
-- Name: board_boardid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.board_boardid_seq OWNED BY public.board.boardid;


--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    taskid integer NOT NULL,
    taskname character varying(255),
    authorid integer NOT NULL,
    asigneeid integer,
    description character varying(255),
    status character varying(255),
    createddate date,
    targetdate date
);


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: task_taskid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.task_taskid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.task_taskid_seq OWNER TO postgres;

--
-- Name: task_taskid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.task_taskid_seq OWNED BY public.task.taskid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    lastname character varying(255),
    firstname character varying(50),
    age integer,
    email character varying(255),
    username character varying(255),
    createdat date
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_userid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_userid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_userid_seq OWNER TO postgres;

--
-- Name: users_userid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_userid_seq OWNED BY public.users.userid;


--
-- Name: board boardid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board ALTER COLUMN boardid SET DEFAULT nextval('public.board_boardid_seq'::regclass);


--
-- Name: task taskid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN taskid SET DEFAULT nextval('public.task_taskid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


--
-- Data for Name: board; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.board (boardid, boardname, authorid) FROM stdin;
\.


--
-- Data for Name: task; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task (taskid, taskname, authorid, asigneeid, description, status, createddate, targetdate) FROM stdin;
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (userid, lastname, firstname, age, email, username, createdat) FROM stdin;
\.


--
-- Name: board_boardid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.board_boardid_seq', 1, false);


--
-- Name: task_taskid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.task_taskid_seq', 1, false);


--
-- Name: users_userid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_userid_seq', 1, false);


--
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (boardid);


--
-- Name: task task_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT task_pkey PRIMARY KEY (taskid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- PostgreSQL database dump complete
--

\unrestrict I7gcmyrxMb195yQNTAZj34egRNaD368ueLOASmGbjdTqULensdr8tuOVW6actPG

