import { integer, pgTable, boolean } from "drizzle-orm/pg-core";

export const user_org_relations = pgTable("user_org_relations", {
    user_id: integer(),
    org_id: integer(),
    can_post_events: boolean(),
    can_add_members: boolean(),
    can_remove_members: boolean()
});
