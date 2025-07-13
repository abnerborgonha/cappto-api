CREATE TYPE "public"."provider_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'IN_DEVELOPEMENT');--> statement-breakpoint
CREATE TABLE "providers" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"full_name" varchar(256) NOT NULL,
	"acronym" varchar(20) NOT NULL,
	"state_code" varchar(2) NOT NULL,
	"website_url" text,
	"api_base_url" text,
	"status" "provider_status_enum",
	"metadata" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "providers_acronym_unique" UNIQUE("acronym")
);
