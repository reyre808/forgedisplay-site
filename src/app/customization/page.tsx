"use client";

import { ChangeEvent, useMemo, useState } from "react";

type ProductType = "business-card" | "card-stand";
type BusinessLogoStyle = "raised" | "engraved-fill" | "flat-inlay" | "logo-plate";
type BusinessLogoPlacement = "front" | "top" | "raised-top";
type CardStopStyle = "raised-text-stop" | "solid-front-lip";

const colors = [
  "Black",
  "White",
  "Red",
  "Grey",
  "Military Green",
  "Twinkling Pink",
  "Silk Blue",
];

export default function CustomizationPage() {
  const [productType, setProductType] = useState<ProductType>("business-card");

  const [brandName, setBrandName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  const [baseColor, setBaseColor] = useState("Black");
  const [accentColor, setAccentColor] = useState("White");

  const [logoFileName, setLogoFileName] = useState("");
  const [logoStyle, setLogoStyle] = useState<BusinessLogoStyle>("raised");
  const [logoPlacement, setLogoPlacement] =
    useState<BusinessLogoPlacement>("front");

  const [cardStopStyle, setCardStopStyle] =
    useState<CardStopStyle>("raised-text-stop");

  const [notes, setNotes] = useState("");

  function handleLogoUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setLogoFileName(file ? file.name : "");
  }

  const sizeLabel = useMemo(() => {
    if (productType === "business-card") {
      return "Standard Fixed Size";
    }

    return "Small Universal Size";
  }, [productType]);

  const summaryTitle = useMemo(() => {
    return productType === "business-card"
      ? "Business Card Stand"
      : "Sports Card / TCG Stand";
  }, [productType]);

  const displayTextLines = [line1, line2, line3].filter(Boolean);

  return (
    <main className="min-h-screen bg-white text-neutral-950">
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
            ForgeDisplay Configurator
          </p>
          <h1 className="mt-4 text-5xl font-bold tracking-tight">
            Build your custom stand
          </h1>
          <p className="mt-5 text-lg text-neutral-600">
            Configure your stand using approved options that are designed to
            stay inside real production limits. Every stand includes the
            ForgeDisplay QR on the underside of the base.
          </p>
        </div>

        <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-8">
            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 1"
                title="Choose your stand type"
                text="Start with the product family you want to customize."
              />

              <div className="mt-6 grid gap-4 md:grid-cols-2">
                <SelectableCard
                  active={productType === "business-card"}
                  title="Business Card Stand"
                  description="Standard-size branded desk display for counters, offices, vendor tables, and business setups."
                  onClick={() => setProductType("business-card")}
                />

                <SelectableCard
                  active={productType === "card-stand"}
                  title="Sports Card / TCG Stand"
                  description="Small universal single-slot stand designed for raw cards, sleeves, top loaders, one touches, and slabs."
                  onClick={() => setProductType("card-stand")}
                />
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 2"
                title="Base configuration"
                text="These are the locked V1 production options for this product."
              />

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <ReadOnlyField
                  label="Selected Product"
                  value={
                    productType === "business-card"
                      ? "Business Card Stand"
                      : "Sports Card / TCG Stand"
                  }
                />

                <ReadOnlyField label="Size" value={sizeLabel} />

                <ReadOnlyField
                  label="QR Code"
                  value="Included automatically on underside of base"
                />

                <ReadOnlyField
                  label="Production Model"
                  value={
                    productType === "business-card"
                      ? "Business Card Holder Master V1"
                      : "Small Universal Card Stand"
                  }
                />
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 3"
                title="Brand text"
                text={
                  productType === "business-card"
                    ? "You can use multiple lines. Designs must stay within the printable front-zone rules."
                    : "Raised front text can be used as part of the card stop design on supported models."
                }
              />

              <div className="mt-6 grid gap-5">
                <Field label="Brand / Business Name">
                  <input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Example: RamsCardShop"
                    className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                  />
                </Field>

                <div className="grid gap-5 md:grid-cols-3">
                  <Field label="Text Line 1">
                    <input
                      value={line1}
                      onChange={(e) => setLine1(e.target.value)}
                      placeholder="Primary text"
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                    />
                  </Field>

                  <Field label="Text Line 2">
                    <input
                      value={line2}
                      onChange={(e) => setLine2(e.target.value)}
                      placeholder="Optional"
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                    />
                  </Field>

                  <Field label="Text Line 3">
                    <input
                      value={line3}
                      onChange={(e) => setLine3(e.target.value)}
                      placeholder="Optional"
                      className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                    />
                  </Field>
                </div>

                {productType === "business-card" ? (
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
                    Business Card Stand rules:
                    <ul className="mt-3 space-y-2">
                      <li>
                        • Text cannot extend more than 5 mm beyond the left or
                        right of the front plate.
                      </li>
                      <li>
                        • Text may extend up to 13 mm above the top of the front
                        plate.
                      </li>
                      <li>
                        • Nothing can extend below the bottom edge of the front
                        plate.
                      </li>
                      <li>
                        • Minimum printable detail thickness is 0.4 mm.
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
                    Sports Card / TCG Stand rules:
                    <ul className="mt-3 space-y-2">
                      <li>• Universal single-slot stand.</li>
                      <li>
                        • Supports raw cards, sleeved cards, top loaders, one
                        touches, and graded slabs.
                      </li>
                      <li>
                        • Raised text can be used as the card stop where
                        applicable.
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 4"
                title="Logo and design style"
                text="Choose how your logo is applied to the stand."
              />

              <div className="mt-6 grid gap-5">
                <Field label="Upload Logo">
                  <div className="rounded-2xl border border-neutral-200 p-4">
                    <input
                      type="file"
                      accept=".png,.jpg,.jpeg,.svg,.pdf"
                      onChange={handleLogoUpload}
                      className="w-full text-sm"
                    />
                    <p className="mt-3 text-sm text-neutral-500">
                      {logoFileName
                        ? `Selected file: ${logoFileName}`
                        : "No file selected yet"}
                    </p>
                  </div>
                </Field>

                {productType === "business-card" ? (
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Logo Style">
                      <select
                        value={logoStyle}
                        onChange={(e) =>
                          setLogoStyle(e.target.value as BusinessLogoStyle)
                        }
                        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                      >
                        <option value="raised">Raised Logo</option>
                        <option value="engraved-fill">
                          Engraved Logo with Fill
                        </option>
                        <option value="flat-inlay">Flat Inlay</option>
                        <option value="logo-plate">Logo Plate</option>
                      </select>
                    </Field>

                    <Field label="Logo Placement">
                      <select
                        value={logoPlacement}
                        onChange={(e) =>
                          setLogoPlacement(
                            e.target.value as BusinessLogoPlacement
                          )
                        }
                        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                      >
                        <option value="front">Front</option>
                        <option value="top">Top</option>
                        <option value="raised-top">Raised Above Top</option>
                      </select>
                    </Field>
                  </div>
                ) : (
                  <div className="grid gap-5 md:grid-cols-2">
                    <Field label="Card Stop Style">
                      <select
                        value={cardStopStyle}
                        onChange={(e) =>
                          setCardStopStyle(
                            e.target.value as CardStopStyle
                          )
                        }
                        className="w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                      >
                        <option value="raised-text-stop">
                          Raised Text Stop
                        </option>
                        <option value="solid-front-lip">
                          Solid Front Lip
                        </option>
                      </select>
                    </Field>

                    <ReadOnlyField
                      label="Logo Placement"
                      value="Front or top placement will be finalized inside approved printable zones"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 5"
                title="Colors"
                text="Choose from currently approved ForgeDisplay filament colors."
              />

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                <ColorSelector
                  label="Base Color"
                  value={baseColor}
                  onChange={setBaseColor}
                />

                <ColorSelector
                  label="Accent / Text / Logo Color"
                  value={accentColor}
                  onChange={setAccentColor}
                />
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 6"
                title="Additional notes"
                text="Use this area for special requests, brand details, or instructions."
              />

              <div className="mt-6">
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us anything important about your design..."
                  className="min-h-[160px] w-full rounded-2xl border border-neutral-200 px-4 py-3 outline-none transition focus:border-neutral-950"
                />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="sticky top-24 rounded-[30px] border border-neutral-200 bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.06)]">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Live Summary
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {summaryTitle}
              </h2>

              <div className="mt-6 space-y-4">
                <SummaryRow
                  label="Size"
                  value={sizeLabel}
                />
                <SummaryRow
                  label="Brand Name"
                  value={brandName || "Not entered yet"}
                />
                <SummaryRow
                  label="Text Lines"
                  value={
                    displayTextLines.length
                      ? displayTextLines.join(" / ")
                      : "No text lines added yet"
                  }
                />
                <SummaryRow
                  label="Base Color"
                  value={baseColor}
                />
                <SummaryRow
                  label="Accent Color"
                  value={accentColor}
                />
                <SummaryRow
                  label="Logo File"
                  value={logoFileName || "No logo uploaded yet"}
                />
                <SummaryRow
                  label="QR"
                  value="Included automatically on underside"
                />

                {productType === "business-card" ? (
                  <>
                    <SummaryRow
                      label="Logo Style"
                      value={formatBusinessLogoStyle(logoStyle)}
                    />
                    <SummaryRow
                      label="Logo Placement"
                      value={formatBusinessLogoPlacement(logoPlacement)}
                    />
                  </>
                ) : (
                  <SummaryRow
                    label="Card Stop Style"
                    value={formatCardStopStyle(cardStopStyle)}
                  />
                )}
              </div>

              <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
                <p className="font-semibold text-neutral-900">
                  Production Notes
                </p>
                <ul className="mt-3 space-y-2">
                  <li>• QR code is always included on the bottom of the base.</li>
                  <li>• Final geometry must remain inside approved print-safe zones.</li>
                  <li>• Unsupported floating details will be rejected.</li>
                  <li>• More advanced live model preview is coming next.</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <a
                  href="/order"
                  className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-neutral-800"
                >
                  Continue to Order Request
                </a>

                <a
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-xl border border-neutral-300 px-6 py-4 font-semibold text-neutral-900 transition hover:bg-neutral-50"
                >
                  Need Help First?
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function SectionTitle({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string;
  title: string;
  text: string;
}) {
  return (
    <div>
      <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
        {eyebrow}
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight">{title}</h2>
      <p className="mt-3 max-w-2xl text-neutral-600">{text}</p>
    </div>
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

function ReadOnlyField({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
      <p className="text-sm font-medium text-neutral-500">{label}</p>
      <p className="mt-2 font-semibold text-neutral-950">{value}</p>
    </div>
  );
}

function SelectableCard({
  active,
  title,
  description,
  onClick,
}: {
  active: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[24px] border p-5 text-left transition ${
        active
          ? "border-neutral-950 bg-neutral-950 text-white"
          : "border-neutral-200 bg-white text-neutral-950 hover:border-neutral-400"
      }`}
    >
      <h3 className="text-2xl font-bold">{title}</h3>
      <p
        className={`mt-3 text-sm ${
          active ? "text-neutral-300" : "text-neutral-600"
        }`}
      >
        {description}
      </p>
    </button>
  );
}

function ColorSelector({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="mb-3 text-sm font-medium text-neutral-700">{label}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            onClick={() => onChange(color)}
            className={`rounded-2xl border px-4 py-3 text-sm font-medium transition ${
              value === color
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
            }`}
          >
            {color}
          </button>
        ))}
      </div>
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

function formatBusinessLogoStyle(value: BusinessLogoStyle) {
  switch (value) {
    case "raised":
      return "Raised";
    case "engraved-fill":
      return "Engraved with Fill";
    case "flat-inlay":
      return "Flat Inlay";
    case "logo-plate":
      return "Logo Plate";
    default:
      return value;
  }
}

function formatBusinessLogoPlacement(value: BusinessLogoPlacement) {
  switch (value) {
    case "front":
      return "Front";
    case "top":
      return "Top";
    case "raised-top":
      return "Raised Above Top";
    default:
      return value;
  }
}

function formatCardStopStyle(value: CardStopStyle) {
  switch (value) {
    case "raised-text-stop":
      return "Raised Text Stop";
    case "solid-front-lip":
      return "Solid Front Lip";
    default:
      return value;
  }
}