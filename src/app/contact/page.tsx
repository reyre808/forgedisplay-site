export default function ContactPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-20">
      <h1 className="text-5xl font-black">Contact ForgeDisplay</h1>

      <p className="mt-6 max-w-2xl text-lg text-neutral-600">
        Reach out to discuss a custom order, branded stand concept, QR
        integration, or future product collaboration.
      </p>

      <div className="mt-12 grid gap-6">
        <div className="rounded-2xl border p-6">
          <h2 className="text-2xl font-bold">Email</h2>
          <p className="mt-3 text-neutral-600">hello@forgedisplay.com</p>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-2xl font-bold">Custom Orders</h2>
          <p className="mt-3 text-neutral-600">
            Custom order form and quote request workflow coming soon.
          </p>
        </div>
      </div>
    </main>
  );
}