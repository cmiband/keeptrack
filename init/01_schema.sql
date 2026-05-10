--
-- PostgreSQL database dump
--

\restrict GVhE8QdT4WKcKMmCN3tSWWrqQHZeeUhyfqT647GCpaNJhE1E8kituRJcnhScK6T

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

--
-- Name: board_drop_dependencies(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.board_drop_dependencies() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	DELETE FROM task WHERE boardid=OLD.boardid;
	DELETE FROM boardassignment WHERE boardid=OLD.boardid;
	RETURN OLD;
END;
$$;


ALTER FUNCTION public.board_drop_dependencies() OWNER TO postgres;

--
-- Name: task_drop_dependencies(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.task_drop_dependencies() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	DELETE FROM taskassignment WHERE taskid=OLD.taskid;
	DELETE FROM taskcomment WHERE taskid=OLD.taskid;
	RETURN OLD;
END;
$$;


ALTER FUNCTION public.task_drop_dependencies() OWNER TO postgres;

--
-- Name: user_drop_dependencies(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.user_drop_dependencies() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
	DELETE FROM taskassignment WHERE userid=OLD.userid;
	DELETE FROM boardassignment WHERE userid=OLD.userid;
	RETURN OLD;
END;
$$;


ALTER FUNCTION public.user_drop_dependencies() OWNER TO postgres;

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
-- Name: boardassignment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.boardassignment (
    boardassignmentid integer NOT NULL,
    boardid integer,
    userid integer
);


ALTER TABLE public.boardassignment OWNER TO postgres;

--
-- Name: boardassignment_boardassignmentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.boardassignment_boardassignmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.boardassignment_boardassignmentid_seq OWNER TO postgres;

--
-- Name: boardassignment_boardassignmentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.boardassignment_boardassignmentid_seq OWNED BY public.boardassignment.boardassignmentid;


--
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
    taskid integer NOT NULL,
    taskname character varying(255),
    authorid integer NOT NULL,
    description text,
    createddate date,
    targetdate date,
    boardid integer,
    statusid integer
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
-- Name: taskassignment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taskassignment (
    taskassignmentid integer NOT NULL,
    taskid integer,
    userid integer
);


ALTER TABLE public.taskassignment OWNER TO postgres;

--
-- Name: taskassignment_taskassignmentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.taskassignment_taskassignmentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.taskassignment_taskassignmentid_seq OWNER TO postgres;

--
-- Name: taskassignment_taskassignmentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.taskassignment_taskassignmentid_seq OWNED BY public.taskassignment.taskassignmentid;


--
-- Name: taskcomment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taskcomment (
    taskcommentid integer NOT NULL,
    authorid integer,
    createddate date,
    commentbody text,
    taskid integer NOT NULL
);


ALTER TABLE public.taskcomment OWNER TO postgres;

--
-- Name: taskcomment_taskcommentid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.taskcomment_taskcommentid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.taskcomment_taskcommentid_seq OWNER TO postgres;

--
-- Name: taskcomment_taskcommentid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.taskcomment_taskcommentid_seq OWNED BY public.taskcomment.taskcommentid;


--
-- Name: taskstatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taskstatus (
    taskstatusid integer NOT NULL,
    statusname character varying(255),
    statuslabel character varying(255),
    statuscolor text,
    boardid integer
);


ALTER TABLE public.taskstatus OWNER TO postgres;

--
-- Name: taskstatus_taskstatusid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.taskstatus_taskstatusid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.taskstatus_taskstatusid_seq OWNER TO postgres;

--
-- Name: taskstatus_taskstatusid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.taskstatus_taskstatusid_seq OWNED BY public.taskstatus.taskstatusid;


--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    userid integer NOT NULL,
    lastname character varying(255),
    firstname character varying(50),
    email character varying(255),
    username character varying(255),
    createddate date
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
-- Name: boardassignment boardassignmentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.boardassignment ALTER COLUMN boardassignmentid SET DEFAULT nextval('public.boardassignment_boardassignmentid_seq'::regclass);


--
-- Name: task taskid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task ALTER COLUMN taskid SET DEFAULT nextval('public.task_taskid_seq'::regclass);


--
-- Name: taskassignment taskassignmentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskassignment ALTER COLUMN taskassignmentid SET DEFAULT nextval('public.taskassignment_taskassignmentid_seq'::regclass);


--
-- Name: taskcomment taskcommentid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskcomment ALTER COLUMN taskcommentid SET DEFAULT nextval('public.taskcomment_taskcommentid_seq'::regclass);


--
-- Name: taskstatus taskstatusid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskstatus ALTER COLUMN taskstatusid SET DEFAULT nextval('public.taskstatus_taskstatusid_seq'::regclass);


--
-- Name: users userid; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN userid SET DEFAULT nextval('public.users_userid_seq'::regclass);


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
-- Name: taskcomment taskcomment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskcomment
    ADD CONSTRAINT taskcomment_pkey PRIMARY KEY (taskcommentid);


--
-- Name: taskstatus taskstatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taskstatus
    ADD CONSTRAINT taskstatus_pkey PRIMARY KEY (taskstatusid);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- Name: board board_deletion; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER board_deletion AFTER DELETE ON public.board FOR EACH ROW EXECUTE FUNCTION public.board_drop_dependencies();


--
-- Name: task task_deletion; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER task_deletion AFTER DELETE ON public.task FOR EACH ROW EXECUTE FUNCTION public.task_drop_dependencies();


--
-- Name: users user_deletion; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER user_deletion AFTER DELETE ON public.users FOR EACH ROW EXECUTE FUNCTION public.user_drop_dependencies();


--
-- PostgreSQL database dump complete
--

\unrestrict GVhE8QdT4WKcKMmCN3tSWWrqQHZeeUhyfqT647GCpaNJhE1E8kituRJcnhScK6T

