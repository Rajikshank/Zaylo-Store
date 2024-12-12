ALTER TABLE "productdiscounts" RENAME TO "product_discounts";--> statement-breakpoint
ALTER TABLE "product_discounts" DROP CONSTRAINT "productdiscounts_productID_products_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "product_discounts" ADD CONSTRAINT "product_discounts_productID_products_id_fk" FOREIGN KEY ("productID") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
