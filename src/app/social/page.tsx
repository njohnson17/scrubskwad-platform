import { getSupabaseAdmin } from "@/lib/supabase/server";

export const revalidate = 1800;

export default async function SocialPage() {
  const posts = await getSocialPosts();

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">Social proof</p>
        <h1 className="mt-2 text-4xl font-semibold text-scrub-ink">Latest from ScrubSkwad</h1>
        {posts.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {posts.map((post) => (
              <a key={post.id} href={post.url} className="rounded-lg bg-white p-5 shadow-premium">
                <p className="text-xs font-semibold uppercase text-scrub-graphite">{post.platform}</p>
                <p className="mt-3 text-sm text-scrub-ink">{post.caption}</p>
              </a>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg bg-white p-6 shadow-premium">
            <h2 className="text-xl font-semibold text-scrub-ink">Social feeds are being connected</h2>
            <p className="mt-3 leading-7 text-scrub-graphite">
              Instagram, TikTok, Facebook and YouTube updates will appear here once official account access is connected.
            </p>
          </div>
        )}
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
