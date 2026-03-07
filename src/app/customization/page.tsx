export default function CustomizationPage() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-5xl font-black">Customization</h1>

      <p className="mt-6 max-w-3xl text-lg text-neutral-600">
        This page is being built to support full ForgeDisplay customization,
        including branded text, QR integration, color options, logo placement,
        and future 3D live product previews.
      </p>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        <div className="rounded-2xl border p-6">
          <h2 className="text-2xl font-bold">Current Capabilities</h2>
          <ul className="mt-4 space-y-3 text-neutral-600">
            <li>• Custom front text</li>
            <li>• Brand-specific stand concepts</li>
            <li>• QR code placement options</li>
            <li>• Business card and card stand formats</li>
          </ul>
        </div>

        <div className="rounded-2xl border p-6">
          <h2 className="text-2xl font-bold">Coming Soon</h2>
          <ul className="mt-4 space-y-3 text-neutral-600">
            <li>• Live 3D model preview</li>
            <li>• Customer mockup generation</li>
            <li>• Saved account designs</li>
            <li>• Reorder previous custom products</li>
          </ul>
        </div>
      </div>
    </main>
  );
}