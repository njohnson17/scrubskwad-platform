import { listApprovedReviews } from "@/lib/content";

export const revalidate = 3600;

export default async function ReviewsPage() {
  const reviews = await listApprovedReviews().catch(() => []);

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">Social proof</p>
        <h1 className="mt-2 text-4xl font-semibold text-scrub-ink">Reviews</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <article key={review.id} className="rounded-lg bg-white p-5 shadow-premium">
              <p className="font-semibold">{review.rating}/5</p>
              <h2 className="mt-2 text-lg font-semibold">{review.title}</h2>
              <p className="mt-2 text-scrub-graphite">{review.body}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
