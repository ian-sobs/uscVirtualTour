import { smallint, integer, serial, pgTable, varchar, pgEnum, text, index } from "drizzle-orm/pg-core";
import {timestamps} from './columns.helpers'

export const campuses = pgTable("campuses", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  address: text(),
  ...timestamps
}, (table) => [
    index("campus_name_idx").on(table.name)
]);


export const categoryEnum = pgEnum('category', ['buildings', 'events', 'food', 'facilities', 'transport_parking', 'study_areas', 'dorms_residences', 'sports_recreation']);

export const locations = pgTable("locations", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    category: categoryEnum(),
    description: text(),
    campus_id: integer().references(() => campuses.id, {onDelete: 'cascade'})
}, (table) => [
    index("location_name_idx").on(table.name),
    index("category_campus_idx").on(table.category, table.campus_id)
]);


export const buildings = pgTable("buildings", {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    campus_id: integer().references(() => campuses.id, {onDelete: 'cascade'}),
    location_id: integer().references(() => locations.id, {onDelete: 'set null'}),
    basement_count: smallint(),
    floor_count: smallint(),
    ...timestamps
}, (table) => [
    index("building_name_idx").on(table.name),
    index("campus_idx").on(table.campus_id)
]);

