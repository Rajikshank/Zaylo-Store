/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'password_reset_tokens'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "password_reset_tokens" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "password_reset_tokens" ALTER COLUMN "id" DROP NOT NULL;--> statement-breakpoint
/* 
    Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
    We are working on making it available!

    Meanwhile you can:
        1. Check pk name in your database, by running
            SELECT constraint_name FROM information_schema.table_constraints
            WHERE table_schema = 'public'
                AND table_name = 'two_factor_tokens'
                AND constraint_type = 'PRIMARY KEY';
        2. Uncomment code below and paste pk name manually
        
    Hope to release this update as soon as possible
*/

-- ALTER TABLE "two_factor_tokens" DROP CONSTRAINT "<constraint_name>";--> statement-breakpoint
ALTER TABLE "two_factor_tokens" ALTER COLUMN "id" DROP NOT NULL;