CREATE TABLE IF NOT EXISTS "invoice_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_id" integer,
	"name" varchar(255) NOT NULL,
	"description" text,
	"quantity" integer NOT NULL,
	"amount" numeric(10, 2) NOT NULL,
	"total" numeric(10, 2) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "invoices" (
	"id" serial PRIMARY KEY NOT NULL,
	"invoice_number" varchar NOT NULL,
	"invoice_date" timestamp NOT NULL,
	"payment_date" timestamp NOT NULL,
	"bill_to" jsonb NOT NULL,
	"ship_to" jsonb,
	"company" jsonb,
	"sub_total" numeric(10, 2) NOT NULL,
	"tax_rate" numeric(5, 2),
	"tax_amount" numeric(10, 2),
	"grand_total" numeric(10, 2) NOT NULL,
	"notes" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	CONSTRAINT "invoices_invoice_number_unique" UNIQUE("invoice_number")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "invoice_items" ADD CONSTRAINT "invoice_items_invoice_id_invoices_id_fk" FOREIGN KEY ("invoice_id") REFERENCES "invoices"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
