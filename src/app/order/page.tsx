"use client";

import { useMemo, useState } from "react";

type ConfigData = {
  productType?: string;
  sizeLabel?: string;
  brandName?: string;
  line1?: string;
  line2?: string;
  line3?: string;
  baseColor?: string;
  accentColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  uniqueColors?: string[];
  logoFileName?: string;
  logoStyle?: string;
  logoPlacement?: string;
  cardStopStyle?: string;
  premiumFinish?: boolean;
  notes?: string;
  forgeDisplaySignature?: boolean;
  signaturePlacement?: string;
  pricing?: {
    basePrice?: number;
    extraColorCount?: number;
    extraColorCharge?: number;
    logoCharge?: number;
    premiumFinishCharge?: number;
    estimatedPrice?: number;
  };
};

function getStoredConfig(): ConfigData | null {
  if (typeof window === "undefined") return null;

  const raw = window.sessionStorage.getItem("fd-custom-config");
  if (!raw) return null;

  try {
    return JSON.parse(raw) as ConfigData;
  } catch {
    return null;
  }
}

export default function OrderPage() {
  const initialConfig = useMemo(() => getStoredConfig(), []);
  const [submitted, setSubmitted] = useState(false);

  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [businessName, setBusinessName] = useState(
    initialConfig?.brandName || ""
  );
  const [notes, setNotes] = useState(initialConfig?.notes || "");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const payload = {
      customerName,
      customerEmail,
      businessName,
      notes,
      config: initialConfig,
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
        <div className="mx-auto max-w-3xl rounded-[36px] border border-neutral-200 bg-white p-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
            ForgeDisplay
          </p>
          <h1 className="mt-4 text-4xl font-bold tracking-tight">
            Order Request Received
          </h1>
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Thanks for submitting your custom stand request. We&apos;ll review
            your build details and reach out to you shortly.
          </p>

          <div className="mt-10 rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-left text-sm leading-7 text-neutral-600">
            <p className="font-semibold text-neutral-950">What happens next</p>
            <ul className="mt-3 space-y-2">
              <li>• We review your stand configuration and pricing details.</li>
              <li>• We confirm any final production notes if needed.</li>
              <li>• We follow up with the next step for approval and fulfillment.</li>
            </ul>
          </div>
        </div>
      </main>
    );
  }

  const textLines =
    [initialConfig?.line1, initialConfig?.line2, initialConfig?.line3]
      .filter(Boolean)
      .join(" / ") || "No text entered";

  const productTypeLabel =
    initialConfig?.productType === "business-card"
      ? "Business Card Stand"
      : initialConfig?.productType === "card-stand"
      ? "Sports Card / TCG Stand"
      : "Not selected";

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
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Your selected configuration is already loaded below. Add your
            contact details and send your request for review.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.05fr_0.95fr]">
          <form
            onSubmit={handleSubmit}
            className="rounded-[32px] border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]"
          >
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Contact Details
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Tell us where to reach you
              </h2>
            </div>

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
                  placeholder="Anything else we should know before reviewing your request?"
                  className="min-h-[180px] w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                />
              </Field>

              <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5 text-sm leading-7 text-neutral-600">
                <p className="font-semibold text-neutral-950">
                  Before you submit
                </p>
                <ul className="mt-3 space-y-2">
                  <li>• We&apos;ll review your requested options and pricing.</li>
                  <li>• Final manufacturability is confirmed before fulfillment.</li>
                  <li>• If anything needs adjustment, we&apos;ll contact you first.</li>
                </ul>
              </div>

              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center rounded-2xl bg-black px-6 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition hover:bg-neutral-800 hover:translate-y-[-1px]"
              >
                Submit Order Request
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <div className="rounded-[32px] border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Config Summary
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Your selected build
              </h2>

              <div className="mt-6 space-y-4">
                <SummaryRow label="Product Type" value={productTypeLabel} />
                <SummaryRow
                  label="Size"
                  value={initialConfig?.sizeLabel || "Not selected"}
                />
                <SummaryRow
                  label="Brand Name"
                  value={initialConfig?.brandName || "Not entered"}
                />
                <SummaryRow label="Text Lines" value={textLines} />
                <SummaryRow
                  label="Colors"
                  value={
                    initialConfig?.uniqueColors?.length
                      ? initialConfig.uniqueColors.join(", ")
                      : "Not selected"
                  }
                />
                <SummaryRow
                  label="Logo File"
                  value={initialConfig?.logoFileName || "No file selected"}
                />

                {initialConfig?.productType === "business-card" ? (
                  <>
                    <SummaryRow
                      label="Logo Style"
                      value={initialConfig?.logoStyle || "Not selected"}
                    />
                    <SummaryRow
                      label="Logo Placement"
                      value={initialConfig?.logoPlacement || "Not selected"}
                    />
                  </>
                ) : (
                  <SummaryRow
                    label="Card Stop Style"
                    value={initialConfig?.cardStopStyle || "Not selected"}
                  />
                )}

                <SummaryRow
                  label="Premium Finish"
                  value={initialConfig?.premiumFinish ? "Added" : "Not added"}
                />
              </div>
            </div>

            <div className="rounded-[32px] border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Estimated Pricing
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                Current estimate
              </h2>

              <div className="mt-6 rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
                <div className="space-y-3">
                  <PriceRow
                    label="Base Stand"
                    value={initialConfig?.pricing?.basePrice || 0}
                  />
                  <PriceRow
                    label={`Extra Colors (${initialConfig?.pricing?.extraColorCount || 0})`}
                    value={initialConfig?.pricing?.extraColorCharge || 0}
                  />
                  <PriceRow
                    label="Logo Upload"
                    value={initialConfig?.pricing?.logoCharge || 0}
                  />
                  <PriceRow
                    label="Premium Finish"
                    value={initialConfig?.pricing?.premiumFinishCharge || 0}
                  />
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-neutral-300 pt-4">
                  <span className="text-base font-semibold text-neutral-950">
                    Estimated Total
                  </span>
                  <span className="text-2xl font-black tracking-tight text-neutral-950">
                    ${initialConfig?.pricing?.estimatedPrice || 0}
                  </span>
                </div>
              </div>

              <p className="mt-4 text-sm leading-7 text-neutral-500">
                Final pricing may adjust slightly depending on manufacturability,
                file quality, and any last-minute design changes.
              </p>
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

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm text-neutral-600">{label}</span>
      <span className="text-sm font-semibold text-neutral-950">${value}</span>
    </div>
  );
}