'use server'

import { db } from "@/db/drizzle";
import { widgetVisibility } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { auth } from '@clerk/nextjs/server';

const connectivityErrorResponse = {
    success: false,
    error: 'Unable to toggle widget visibility. Please check your internet connection and try again.'
};

async function validateUser(userId: string): Promise<{ success: boolean, error?: string }> {
    const { userId: authenticatedUserId } = await auth();
    if (!authenticatedUserId || authenticatedUserId !== userId) {
        return {
            success: false,
            error: 'Unauthorized access'
        };
    }
    return { success: true };
}

export async function toggleWidgetVisibility(widgetId: number, newVisibility: boolean, userId: string):
    Promise<{ success: boolean, error?: string }> {
    try {
        // Validate user
        const authResult = await validateUser(userId);
        if (!authResult.success) {
            return authResult;
        }

        //Find existing record
        const existingWidgetVisibility = await db
            .select()
            .from(widgetVisibility)
            .where(and(eq(widgetVisibility.widgetId, widgetId), eq(widgetVisibility.userId, userId)))
            .limit(1)
            .then(rows => rows[0]);

        if (existingWidgetVisibility) {
            //If record exists, update it
            await db
                .update(widgetVisibility)
                .set({ isVisible: newVisibility })
                .where(and(eq(widgetVisibility.widgetId, widgetId), eq(widgetVisibility.userId, userId)));
        } else {
            //If record does not exist, create it
            await db.insert(widgetVisibility).values({
                widgetId,
                isVisible: newVisibility,
                userId
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Failed to toggle widget visibility:', String(error));
        return connectivityErrorResponse;
    }
}

export async function getAllVisibleWidgetIds(userId: string): Promise<{ success: boolean, visibleWidgetIds?: number[], error?: string }> {
    try {
        // Validate user
        const authResult = await validateUser(userId);
        if (!authResult.success) {
            return authResult;
        }

        const widgetVisibilities = await db.select().from(widgetVisibility).where(eq(widgetVisibility.userId, userId))
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