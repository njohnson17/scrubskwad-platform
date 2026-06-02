import Link from "next/link";
import { listPublishedPosts } from "@/lib/content";

export const revalidate = 3600;

export default async function JournalPage() {
  const posts = await listPublishedPosts().catch(() => []);

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">Journal</p>
        <h1 className="mt-2 text-4xl font-semibold text-scrub-ink">Guides and local advice</h1>
        {posts.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.id} href={`/journal/${post.slug}`} className="rounded-lg bg-white p-5 shadow-premium">
                <p className="text-xs font-semibold uppercase text-scrub-graphite">{post.category}</p>
                <h2 className="mt-2 text-lg font-semibold">{post.title}</h2>
                <p className="mt-2 text-scrub-graphite">{post.excerpt}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg bg-white p-6 shadow-premium">
            <h2 className="text-xl font-semibold text-scrub-ink">Guides are being prepared</h2>
            <p className="mt-3 leading-7 text-scrub-graphite">
              The journal will publish cleaning, moving, bin hygiene, car care and Manchester property guides.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
