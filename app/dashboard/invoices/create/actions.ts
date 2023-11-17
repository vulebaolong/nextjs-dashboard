"use server";

import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface IFormData {
    customerId?: string;
    amount?: number;
    status?: string;
}

export async function createInvoice(formData: IFormData) {
    if (formData.amount === 0 || !formData.amount) return console.log("Vui lòng nhập amount");
    if (formData.customerId === "") return console.log("Vui lòng nhập customerId");
    if (!formData.status) return console.log("Vui lòng nhập status");

    const amountInCents = formData.amount * 100;
    const date = new Date().toISOString().split("T")[0];

    try {
        await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${formData.customerId}, ${amountInCents}, ${formData.status}, ${date})
  `;
        revalidatePath("/");
    } catch (error) {
        return {
            message: "Database Error: Failed to Create Invoice.",
        };
    }
    redirect("/dashboard/invoices");
}
