export default function QRPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-5xl font-black">QR Code Integration</h1>

      <p className="mt-6 text-lg text-neutral-600 max-w-2xl">
        ForgeDisplay stands can include permanent QR codes that direct
        customers to your website, social media, Google reviews, or
        promotional landing pages.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border p-6">
          <h3 className="font-bold text-xl">Website QR</h3>
          <p className="mt-2 text-neutral-600">
            Send customers directly to your business website.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="font-bold text-xl">Social Media</h3>
          <p className="mt-2 text-neutral-600">
            Grow your Instagram, TikTok, or other social platforms.
          </p>
        </div>

        <div className="rounded-2xl border p-6">
          <h3 className="font-bold text-xl">Review Funnels</h3>
          <p className="mt-2 text-neutral-600">
            Direct customers to leave Google or Yelp reviews.
          </p>
        </div>
      </div>
    </main>
  );
}