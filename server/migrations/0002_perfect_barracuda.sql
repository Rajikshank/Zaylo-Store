CREATE TABLE IF NOT EXISTS "email_Tokens" (
	"id" text PRIMARY KEY NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "email_Tokens_id_token_pk" PRIMARY KEY("id","token")
);
