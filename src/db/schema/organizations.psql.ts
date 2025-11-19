import { serial, pgTable, text, boolean, index } from "drizzle-orm/pg-core";
import { timestamps } from '../columns.helpers';

//done
export const organizations = pgTable("organizations", {
    id: serial().primaryKey(),
    logo: text(),
    is_student_org: boolean(),
    ...timestamps
});
