import { listApprovedReviews } from "@/lib/content";

export const revalidate = 3600;

export default async function ReviewsPage() {
  const reviews = await listApprovedReviews().catch(() => []);

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto max-w-5xl">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">Social proof</p>
        <h1 className="mt-2 text-4xl font-semibold text-scrub-ink">Reviews</h1>
        {reviews.length ? (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {reviews.map((review) => (
              <article key={review.id} className="rounded-lg bg-white p-5 shadow-premium">
                <p className="font-semibold">{review.rating}/5</p>
                <h2 className="mt-2 text-lg font-semibold">{review.title}</h2>
                <p className="mt-2 text-scrub-graphite">{review.body}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-lg bg-white p-6 shadow-premium">
            <h2 className="text-xl font-semibold text-scrub-ink">Review collection is being connected</h2>
            <p className="mt-3 leading-7 text-scrub-graphite">
              ScrubSkwad will display verified Google and website reviews here once the live review sources are connected.
              We do not publish fabricated testimonials.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
