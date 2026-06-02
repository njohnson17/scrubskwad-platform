export default async function DepositPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <main className="min-h-screen px-4 py-8">
      <section className="mx-auto max-w-xl rounded-lg bg-white p-6 shadow-premium">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">Deposit</p>
        <h1 className="mt-2 text-3xl font-semibold text-scrub-ink">Deposit request pending</h1>
        <p className="mt-4 text-scrub-graphite">
          Booking {id} is ready for deposit payment. Connect Stripe or your selected payment provider to replace
          this placeholder with a hosted checkout.
        </p>
      </section>
    </main>
  );
}
