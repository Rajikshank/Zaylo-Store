CREATE TABLE IF NOT EXISTS "productdiscounts" (
	"id" serial PRIMARY KEY NOT NULL,
	"discount" real DEFAULT 10.1,
	"productID" serial NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "productdiscounts" ADD CONSTRAINT "productdiscounts_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
