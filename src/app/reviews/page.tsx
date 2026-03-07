export default function ReviewsPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-5xl font-black">Customer Reviews</h1>

      <p className="mt-6 max-w-3xl text-lg text-neutral-600">
        ForgeDisplay will feature customer ratings, product feedback, and video
        testimonials to show real-world quality and brand impact.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <div className="text-lg font-bold">★★★★★</div>
          <p className="mt-3 text-neutral-600">
            Clean, professional, and exactly what I wanted for my display.
          </p>
          <div className="mt-4 font-semibold">Future Client Review</div>
        </div>

        <div className="rounded-2xl border p-6">
          <div className="text-lg font-bold">★★★★★</div>
          <p className="mt-3 text-neutral-600">
            The custom branding made our setup look much more legit.
          </p>
          <div className="mt-4 font-semibold">Future Client Review</div>
        </div>

        <div className="rounded-2xl border p-6">
          <div className="text-lg font-bold">★★★★★</div>
          <p className="mt-3 text-neutral-600">
            Great quality and a smart way to promote our business with QR.
          </p>
          <div className="mt-4 font-semibold">Future Client Review</div>
        </div>
      </div>

      <div className="mt-12 rounded-2xl border p-8">
        <h2 className="text-2xl font-bold">Video Testimonials</h2>
        <p className="mt-3 text-neutral-600">
          This section will later hold embedded customer video reviews and
          showcase content.
        </p>
      </div>
    </main>
  );
}