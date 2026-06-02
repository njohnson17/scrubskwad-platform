import { notFound } from "next/navigation";
import { getSupabaseAdmin } from "@/lib/supabase/server";

export default async function JournalPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const supabase = getSupabaseAdmin();
  const { data: post } = await supabase.from("journal_posts").select("*").eq("slug", slug).eq("status", "published").single();
  if (!post) notFound();

  return (
    <main className="min-h-screen px-4 py-8">
      <article className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-premium">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">{post.category}</p>
        <h1 className="mt-2 text-4xl font-semibold text-scrub-ink">{post.title}</h1>
        <div className="mt-6 whitespace-pre-wrap leading-7 text-scrub-ink">{post.body}</div>
      </article>
    </main>
  );
}

