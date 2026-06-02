import { getSupabaseAdmin } from "@/lib/supabase/server";

export const revalidate = 1800;

export default async function SocialPage() {
  const posts = await getSocialPosts();

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">Social proof</p>
        <h1 className="mt-2 text-4xl font-semibold text-scrub-ink">Latest from ScrubSkwad</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {posts.map((post) => (
            <a key={post.id} href={post.url} className="rounded-lg bg-white p-5 shadow-premium">
              <p className="text-xs font-semibold uppercase text-scrub-graphite">{post.platform}</p>
              <p className="mt-3 text-sm text-scrub-ink">{post.caption}</p>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}

async function getSocialPosts() {
  try {
    const supabase = getSupabaseAdmin();
    const { data, error } = await supabase
      .from("social_feeds")
      .select("*")
      .eq("status", "active")
      .order("published_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  } catch {
    return [];
  }
}
