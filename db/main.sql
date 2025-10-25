-- SCHEMA: main
-- DROP SCHEMA IF EXISTS main ;
CREATE SCHEMA IF NOT EXISTS main
    AUTHORIZATION root;

 CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: main.users
-- DROP TABLE IF EXISTS main.users;
CREATE TABLE IF NOT EXISTS main.users
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    names character varying COLLATE pg_catalog."default" NOT NULL,
    last_names character varying COLLATE pg_catalog."default" NOT NULL,
    email character varying COLLATE pg_catalog."default" NOT NULL,
    status boolean NOT NULL DEFAULT true,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT users_email_key UNIQUE (email)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS main.users
    OWNER to root;

-- Table: main.lottery
-- DROP TABLE IF EXISTS main.lottery;
CREATE TABLE IF NOT EXISTS main.lottery
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id uuid NOT NULL,
    points integer NOT NULL DEFAULT 0,
    status boolean NOT NULL DEFAULT true,
    created_at timestamp without time zone NOT NULL DEFAULT now(),
    updated_at timestamp without time zone NOT NULL DEFAULT now(),
    deleted_at timestamp without time zone,
    CONSTRAINT lottery_pkey PRIMARY KEY (id),
    CONSTRAINT lottery_user_id_fkey FOREIGN KEY (user_id)
        REFERENCES main.users (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS main.lottery
    OWNER to root;