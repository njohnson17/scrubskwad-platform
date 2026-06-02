import { getSupabaseAdmin } from "@/lib/supabase/server";

export async function listApprovedReviews() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("status", "approved")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function listPublishedPosts() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("journal_posts")
    .select("*")
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (error) throw new Error(error.message);
  return data;
}

export async function getSeoPage(service: string, location: string) {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase
    .from("seo_pages")
    .select("*")
    .eq("service_slug", service)
    .eq("location_slug", location)
    .eq("status", "published")
    .single();
  if (error) return null;
  return data;
}

export async function listSeoPages() {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("seo_pages").select("*").eq("status", "published");
  if (error) throw new Error(error.message);
  return data;
}

