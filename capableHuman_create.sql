--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

-- accounts table
CREATE TABLE public.accounts (
	"_id" serial NOT NULL,
	"username" varchar NOT NULL,
	"email" varchar, 
	"password" varchar,
  	"reactionGame_id" bigint, 
  	"memoryGame_id" bigint,
    "numberGame_id" bigint,
	CONSTRAINT "accounts_pk" PRIMARY KEY ("_id"),
  FOREIGN KEY (reactionGame_id) REFERENCES public.reactionGame(reactionGame_id),
  FOREIGN KEY (memoryGame_id) REFERENCES public.memoryGame(memoryGame_id),
  FOREIGN KEY (numberGame_id) REFERENCES public.numberGame(numberGame_id)

) WITH (
  OIDS=FALSE
);

-- Game 1
CREATE TABLE public.reactionGame (
  "_id" serial NOT NULL,
	"highscore" bigint,
	CONSTRAINT "reactionGame_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- Game 2
CREATE TABLE public.memoryGame (
	"_id" serial NOT NULL,
	"highscore" bigint,
	CONSTRAINT "memoryGame_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- Game 3
CREATE TABLE public.numberGame (
	"_id" serial NOT NULL,
	"highscore" bigint,
	CONSTRAINT "numberGame_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

-- add foreign keys
-- ALTER TABLE public.accounts ADD CONSTRAINT "accounts_fk0" FOREIGN KEY ("reactionGame") REFERENCES  public.reactionGame("_id");
-- ALTER TABLE public.accounts ADD CONSTRAINT "accounts_fk1" FOREIGN KEY ("memoryGame") REFERENCES  public.memoryGame("_id");
-- ALTER TABLE public.accounts ADD CONSTRAINT "accounts_fk2" FOREIGN KEY ("numberGame") REFERENCES  public.numberGame("_id");