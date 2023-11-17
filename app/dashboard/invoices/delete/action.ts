"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";

interface IFormData {
    id?: string;
}
export async function deleteInvoice(id: string) {
    // throw new Error("Failed to Delete Invoice");
    try {
        await sql`DELETE FROM invoices WHERE id = ${id}`;
        revalidatePath("/dashboard/invoices");
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Invoice.",
        };
    }
}
