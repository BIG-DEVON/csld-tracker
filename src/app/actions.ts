"use server";

import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";

// --- FIX FOR MAC HANGING (SINGLETON PATTERN) ---
const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | undefined };

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
// -----------------------------------------------

export async function getInitiatives() {
  try {
    const initiatives = await prisma.initiative.findMany({
      orderBy: { kpiId: 'asc' }
    });
    return initiatives;
  } catch (error) {
    console.error("Failed to fetch initiatives:", error);
    return [];
  }
}

export async function updateInitiative(
  id: string, 
  data: { status?: string; diff?: string; notes?: string; reminderDate?: string }
) {
  try {
    const updated = await prisma.initiative.update({
      where: { id },
      data,
    });
    
    // Refresh UI without infinite looping
    revalidatePath("/");
    return { success: true, data: updated };
  } catch (error) {
    console.error("Failed to update initiative:", error);
    return { success: false, error: "Failed to update database" };
  }
}