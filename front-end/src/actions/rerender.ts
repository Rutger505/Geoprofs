"use server";

import { revalidatePath } from "next/cache";

export async function rerender() {
  revalidatePath("/", "layout");
}
