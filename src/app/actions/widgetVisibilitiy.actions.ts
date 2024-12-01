'use server'

import { db } from "@/db/drizzle";
import { widgetVisibility } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function toggleWidgetVisibility(widgetId: number, newVisibility: boolean) {
    try {
        //Find existing record
        const existingWidgetVisibility = await db
            .select()
            .from(widgetVisibility)
            .where(eq(widgetVisibility.widgetId, widgetId))
            .limit(1)
            .then(rows => rows[0]);

        if (existingWidgetVisibility) {
            //If record exists, update it
            await db
                .update(widgetVisibility)
                .set({ isVisible: newVisibility })
                .where(eq(widgetVisibility.widgetId, widgetId));
        } else {
            //If record does not exist, create it
            await db.insert(widgetVisibility).values({
                widgetId,
                isVisible: newVisibility,
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to toggle widget visibility:', error);
        return {
            success: false,
            error: 'Failed to update widget visibility. Please try again.'
        };
    }
}

export async function getAllWidgetVisibilities() {
    try {
        const widgetVisibilities = await db.select().from(widgetVisibility);
        return { success: true, widgetVisibilities };
    } catch (error) {
        console.error('Failed to get all widget visibilities:', error);
        return {
            success: false,
            error: 'Failed to get all widget visibilities. Please try again.'
        };
    }
}