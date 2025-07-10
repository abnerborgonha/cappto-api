CREATE TYPE "public"."branch_type_enum" AS ENUM('head', 'branch');--> statement-breakpoint
CREATE TABLE "companies" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"cnpj" varchar(14) NOT NULL,
	"branch_type" "branch_type_enum",
	"legal_name" varchar(256) NOT NULL,
	"trade_name" varchar(256),
	"main_cnae" varchar(10),
	"zip_code" varchar(8),
	"street_address" varchar(256),
	"address_number" varchar(20),
	"address_complement" varchar(100),
	"neighborhood" varchar(100),
	"city" varchar(100),
	"state" varchar(2),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "companies_cnpj_unique" UNIQUE("cnpj")
);
