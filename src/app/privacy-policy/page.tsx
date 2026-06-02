export default function PrivacyPolicyPage() {
  return <LegalPage title="Privacy Policy" />;
}

function LegalPage({ title }: { title: string }) {
  return (
    <main className="mx-auto max-w-3xl px-4 py-16 md:px-8">
      <p className="text-sm font-bold uppercase text-scrub-graphite">ScrubSkwad</p>
      <h1 className="mt-3 text-4xl font-black text-scrub-ink">{title}</h1>
      <p className="mt-5 leading-7 text-scrub-graphite">
        This page is being prepared for launch. ScrubSkwad handles customer information through secure booking and
        quote request workflows. Full legal copy should be reviewed before the public domain launch.
      </p>
    </main>
  );
}

