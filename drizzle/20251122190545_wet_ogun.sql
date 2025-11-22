CREATE TABLE "user_profiles" (
	"user_id" integer,
	"role" "role" DEFAULT 'student',
	CONSTRAINT "user_profile_unique" UNIQUE("user_id")
);
--> statement-breakpoint
DROP TABLE "users" CASCADE;--> statement-breakpoint
ALTER TABLE "user_profiles" ADD CONSTRAINT "user_profiles_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;