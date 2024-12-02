import { serial, boolean, pgTable, integer, timestamp } from "drizzle-orm/pg-core";

export const widgetVisibility = pgTable("widget_visibility", {
    id: serial("id").primaryKey(),
    widgetId: integer("widget_id").notNull(),
    isVisible: boolean("is_visible").default(true).notNull(),
    lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

export type WidgetVisibility = typeof widgetVisibility.$inferSelect;

