import { createClient } from "@supabase/supabase-js";
import type { Course } from "@/types";

export async function getCourses(): Promise<Course[]> {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  console.log("URL:", url);
  console.log("KEY exists:", !!key);

  const supabase = createClient(url!, key!);

  const { data, error } = await supabase
    .from("courses")
    .select("*");

  console.log("DATA:", JSON.stringify(data));
  console.log("ERROR:", JSON.stringify(error));

  if (error) throw new Error(error.message);

  return data ?? [];
}