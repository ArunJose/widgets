'use server'

import { db } from "@/db/drizzle";
import { widgetVisibility } from "@/db/schema";
import { eq } from "drizzle-orm";

const connectivityErrorResponse = {
    success: false,
    error: 'Unable to toggle widget visibility. Please check your internet connection and try again.'
};

export async function toggleWidgetVisibility(widgetId: number, newVisibility: boolean): Promise<{ success: boolean, error?: string }> {
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
        console.error('Failed to toggle widget visibility:', String(error));
        return connectivityErrorResponse;
    }
}

export async function getAllVisibleWidgetIds(): Promise<{ success: boolean, visibleWidgetIds?: number[], error?: string }> {
    try {
        const widgetVisibilities = await db.select().from(widgetVisibility);
        return {
            success: true,
            visibleWidgetIds: widgetVisibilities
                .sort((a, b) => a.lastUpdated.getTime() - b.lastUpdated.getTime())
                .map((wv) => wv.isVisible ? wv.widgetId : undefined)
                .filter((id): id is number => id !== undefined)
        };
    } catch (error) {
        console.error('Failed to get all widget visibilities:', String(error));
        return connectivityErrorResponse;
    }
}