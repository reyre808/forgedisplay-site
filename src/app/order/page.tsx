"use client";

import { useEffect, useState } from "react";

type ConfigData = {
  productType?: string;
  sizeLabel?: string;
  brandName?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  baseColor?: string;
  accentColor?: string;
  logoFileName?: string;
  logoStyle?: string;
  logoPlacement?: string;
  cardStopStyle?: string;
  notes?: string;
  qrIncluded?: boolean;
  qrPlacement?: string;
};

export default function OrderPage() {
  const [submitted, setSubmitted] = useState(false);
  const [config, setConfig] = useState<ConfigData | null>(null);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const raw = window.sessionStorage.getItem("fd-custom-config");

    if (raw) {
      const parsed = JSON.parse(raw) as ConfigData;
      setConfig(parsed);
      setBusinessName(parsed.brandName || "");
      setNotes(parsed.notes || "");
    }
  }, []);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      customerName,
      customerEmail,
      businessName,
      notes,
      config,
    };

    await fetch("/api/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setSubmitted(true);
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-white px-6 py-20 text-neutral-950">
        <div className="mx-auto max-w-3xl rounded-[30px] border border-neutral-200 bg-white p-10 text-center shadow-sm">
          <h1 className="text-4xl font-bold">Order Request Received</h1>
          <p className="mt-4 text-lg text-neutral-600">
            Thanks for submitting your custom stand request. We&apos;ll review
            your configuration and contact you shortly.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
            ForgeDisplay Order Request
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Finalize your custom stand request
          </h1>
          <p className="mt-5 text-lg text-neutral-600">
            Your selected configuration is pulled in below. Add your contact
            information and submit your request.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm"
          >
            <div className="grid gap-5">
              <Field label="Your Name">
                <input
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  required
                  placeholder="Your full name"
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                />
              </Field>

              <Field label="Email Address">
                <input
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                />
              </Field>

              <Field label="Brand / Business Name">
                <input
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Brand or business name"
                  className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                />
              </Field>

              <Field label="Additional Notes">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Anything else we should know?"
                  className="min-h-[180px] w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                />
              </Field>

              <button
                type="submit"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-neutral-800"
              >
                Submit Order Request
              </button>
            </div>
          </form>

          <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
              Config Summary
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Your selected build
            </h2>

            <div className="mt-6 space-y-4">
              <SummaryRow
                label="Product Type"
                value={
                  config?.productType === "business-card"
                    ? "Business Card Stand"
                    : config?.productType === "card-stand"
                    ? "Sports Card / TCG Stand"
                    : "Not selected"
                }
              />
              <SummaryRow label="Size" value={config?.sizeLabel || "Not selected"} />
              <SummaryRow
                label="Brand Name"
                value={config?.brandName || "Not entered"}
              />
              <SummaryRow
                label="Text Lines"
                value={
                  [config?.line1, config?.line2, config?.line3]
                    .filter(Boolean)
                    .join(" / ") || "No text entered"
                }
              />
              <SummaryRow
                label="Base Color"
                value={config?.baseColor || "Not selected"}
              />
              <SummaryRow
                label="Accent Color"
                value={config?.accentColor || "Not selected"}
              />
              <SummaryRow
                label="Logo File"
                value={config?.logoFileName || "No file selected"}
              />
              <SummaryRow
                label="QR"
                value="Included automatically on underside"
              />

              {config?.productType === "business-card" ? (
                <>
                  <SummaryRow
                    label="Logo Style"
                    value={config?.logoStyle || "Not selected"}
                  />
                  <SummaryRow
                    label="Logo Placement"
                    value={config?.logoPlacement || "Not selected"}
                  />
                </>
              ) : (
                <SummaryRow
                  label="Card Stop Style"
                  value={config?.cardStopStyle || "Not selected"}
                />
              )}
            </div>

            <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
              This request form is now connected to your customizer selections.
              Next, we can make this save uploaded logos and pass a real preview
              into the order system.
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-neutral-700">
        {label}
      </label>
      {children}
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start justify-between gap-4 border-b border-neutral-200 pb-3">
      <span className="text-sm font-medium text-neutral-500">{label}</span>
      <span className="max-w-[60%] text-right font-semibold text-neutral-950">
        {value}
      </span>
    </div>
  );
}