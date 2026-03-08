export default function QRPage() {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-4xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-400">
            ForgeDisplay Standard
          </p>

          <h1 className="mt-4 text-5xl font-bold tracking-tight sm:text-6xl">
            Built-in ForgeDisplay QR Branding
          </h1>

          <p className="mt-6 max-w-3xl text-xl leading-8 text-neutral-300">
            Every ForgeDisplay stand includes a QR code on the underside of the
            base as part of our brand signature. This QR is permanently tied to
            ForgeDisplay and routes back to our site.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          <InfoCard
            title="Always Included"
            text="Every stand includes the ForgeDisplay QR as a built-in branding element."
          />

          <InfoCard
            title="Underside Placement"
            text="The QR is placed on the bottom of the stand so it stays clean, subtle, and consistent."
          />

          <InfoCard
            title="Brand Signature"
            text="This QR is part of the ForgeDisplay identity and is not a removable or customizable feature."
          />
        </div>

        <div className="mt-14 rounded-[32px] border border-white/10 bg-white/5 p-8">
          <h2 className="text-2xl font-bold tracking-tight">
            Why it’s there
          </h2>

          <p className="mt-4 max-w-3xl text-lg leading-8 text-neutral-300">
            The underside QR helps connect every physical ForgeDisplay product
            back to the brand. It acts as a quiet signature built into each
            piece without interfering with the customer’s front-facing design.
          </p>
        </div>
      </section>
    </main>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-white/20 bg-black p-6 shadow-sm">
      <h3 className="text-2xl font-bold tracking-tight text-white">{title}</h3>
      <p className="mt-4 leading-7 text-neutral-400">{text}</p>
    </div>
  );
}