"use server";

import { revalidatePath, revalidateTag } from "next/cache";

export async function revalidatePathAction(path: string) {
  revalidatePath(path, "page");
}
export async function revalidateTagAction(tag: string) {
  revalidateTag(tag);
}