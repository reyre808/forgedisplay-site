"use client";

import { useRouter } from "next/navigation";
import { useMemo, useState, type ChangeEvent, type ReactNode } from "react";

type ProductType = "business-card" | "card-stand";
type BusinessLogoStyle =
  | "raised"
  | "engraved-fill"
  | "flat-inlay"
  | "logo-plate";
type BusinessLogoPlacement = "front" | "top" | "raised-top";
type CardStopStyle = "raised-text-stop" | "solid-front-lip";

type ColorOption = {
  name: string;
  hex: string;
};

const colors: ColorOption[] = [
  { name: "Black", hex: "#111111" },
  { name: "White", hex: "#F5F5F5" },
  { name: "Red", hex: "#C62828" },
  { name: "Grey", hex: "#7A7A7A" },
  { name: "Military Green", hex: "#556B2F" },
  { name: "Twinkling Pink", hex: "#F48FB1" },
  { name: "Silk Blue", hex: "#3F6FD1" },
  { name: "Khaki", hex: "#B6A168" },
];

export default function CustomizationPage() {
  const router = useRouter();

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
    return productType === "business-card"
      ? "Standard Fixed Size"
      : "Small Universal Size";
  }, [productType]);

  const summaryTitle = useMemo(() => {
    return productType === "business-card"
      ? "Business Card Stand"
      : "Sports Card / TCG Stand";
  }, [productType]);

  const displayTextLines = [line1, line2, line3].filter(Boolean);

  const basePrice = useMemo(() => {
    return productType === "business-card" ? 24 : 20;
  }, [productType]);

  const extraColorCharge = useMemo(() => {
    return baseColor !== accentColor ? 6 : 0;
  }, [baseColor, accentColor]);

  const logoCharge = useMemo(() => {
    return logoFileName ? 8 : 0;
  }, [logoFileName]);

  const premiumFinishCharge = useMemo(() => {
    if (productType === "business-card") {
      return logoStyle === "engraved-fill" ||
        logoStyle === "flat-inlay" ||
        logoStyle === "logo-plate"
        ? 6
        : 0;
    }

    return cardStopStyle === "solid-front-lip" ? 0 : 4;
  }, [productType, logoStyle, cardStopStyle]);

  const estimatedPrice = basePrice + extraColorCharge + logoCharge + premiumFinishCharge;

  const baseHex =
    colors.find((c) => c.name === baseColor)?.hex ?? "#111111";
  const accentHex =
    colors.find((c) => c.name === accentColor)?.hex ?? "#F5F5F5";

  function continueToOrder() {
    const config = {
      productType,
      sizeLabel,
      brandName,
      line1,
      line2,
      line3,
      baseColor,
      accentColor,
      logoFileName,
      logoStyle,
      logoPlacement,
      cardStopStyle,
      notes,
      qrIncluded: true,
      qrPlacement: "Underside of base",
      estimatedPrice,
    };

    window.sessionStorage.setItem("fd-custom-config", JSON.stringify(config));
    router.push("/order");
  }

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
            Configure your stand using approved options designed to stay inside
            real production limits. Your preview updates in real time as you
            customize.
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
                  value={summaryTitle}
                />
                <ReadOnlyField label="Size" value={sizeLabel} />
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
                          setCardStopStyle(e.target.value as CardStopStyle)
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
                      value="Front or top placement finalized inside approved printable zones"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 5"
                title="Colors"
                text="Pick from approved ForgeDisplay filament colors and preview them before selecting."
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
                Live Preview
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight">
                {summaryTitle}
              </h2>

              <div className="mt-6 rounded-[28px] border border-neutral-200 bg-neutral-50 p-6">
                <div className="flex min-h-[280px] items-center justify-center">
                  {productType === "business-card" ? (
                    <BusinessCardPreview
                      brandName={brandName}
                      line1={line1}
                      line2={line2}
                      line3={line3}
                      baseHex={baseHex}
                      accentHex={accentHex}
                    />
                  ) : (
                    <CardStandPreview
                      brandName={brandName}
                      line1={line1}
                      baseHex={baseHex}
                      accentHex={accentHex}
                      cardStopStyle={cardStopStyle}
                    />
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <SummaryRow label="Size" value={sizeLabel} />
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
                <SummaryRow label="Base Color" value={baseColor} />
                <SummaryRow label="Accent Color" value={accentColor} />
                <SummaryRow
                  label="Logo File"
                  value={logoFileName || "No logo uploaded yet"}
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

                <SummaryRow
                  label="Starting Price"
                  value={`$${estimatedPrice}`}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
                <p className="font-semibold text-neutral-900">
                  Pricing Guide
                </p>
                <ul className="mt-3 space-y-2">
                  <li>• Business Card Stand base price starts at $24</li>
                  <li>• Sports Card / TCG Stand base price starts at $20</li>
                  <li>• Additional color adds approximately $6</li>
                  <li>• Uploaded logo adds approximately $8</li>
                  <li>• Premium finish or raised text stop adds approximately $4–$6</li>
                </ul>
              </div>

              <div className="mt-8 flex flex-col gap-3">
                <button
                  type="button"
                  onClick={continueToOrder}
                  className="inline-flex items-center justify-center rounded-xl bg-black px-6 py-4 font-semibold text-white transition hover:bg-neutral-800"
                >
                  Continue to Order Request
                </button>

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
  children: ReactNode;
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
            key={color.name}
            type="button"
            onClick={() => onChange(color.name)}
            className={`rounded-2xl border p-3 text-left transition ${
              value === color.name
                ? "border-neutral-950 bg-neutral-950 text-white"
                : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className="h-5 w-5 rounded-full border border-black/10"
                style={{ backgroundColor: color.hex }}
              />
              <span className="text-sm font-medium">{color.name}</span>
            </div>
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

function BusinessCardPreview({
  brandName,
  line1,
  line2,
  line3,
  baseHex,
  accentHex,
}: {
  brandName: string;
  line1: string;
  line2: string;
  line3: string;
  baseHex: string;
  accentHex: string;
}) {
  const mainText = brandName || line1 || "YOUR BRAND";
  const extraLines = [line1, line2, line3].filter(Boolean).slice(0, 2);

  return (
    <div className="relative w-full max-w-[420px]">
      <div className="absolute left-1/2 top-[83%] h-8 w-56 -translate-x-1/2 rounded-full bg-black/15 blur-2xl" />
      <div
        className="relative mx-auto h-[210px] w-[360px] rounded-[28px] border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
        style={{ backgroundColor: baseHex }}
      >
        <div
          className="absolute left-1/2 top-[-26px] h-[110px] w-[180px] -translate-x-1/2 rounded-[18px] border border-black/10"
          style={{ backgroundColor: baseHex }}
        />
        <div className="absolute inset-x-0 bottom-5 px-5 text-center">
          <div
            className="text-[28px] font-black uppercase tracking-wide"
            style={{ color: accentHex }}
          >
            {mainText}
          </div>
          {extraLines.length > 0 && (
            <div
              className="mt-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: accentHex }}
            >
              {extraLines.join(" • ")}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function CardStandPreview({
  brandName,
  line1,
  baseHex,
  accentHex,
  cardStopStyle,
}: {
  brandName: string;
  line1: string;
  baseHex: string;
  accentHex: string;
  cardStopStyle: CardStopStyle;
}) {
  const text = brandName || line1 || "CARD SHOP";

  return (
    <div className="relative w-full max-w-[420px]">
      <div className="absolute left-1/2 top-[83%] h-8 w-56 -translate-x-1/2 rounded-full bg-black/15 blur-2xl" />
      <div
        className="relative mx-auto h-[175px] w-[360px] rounded-[24px] border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
        style={{ backgroundColor: baseHex }}
      >
        <div
          className="absolute left-1/2 top-[16px] h-[105px] w-[250px] -translate-x-1/2 rounded-[16px] border border-black/10"
          style={{ backgroundColor: baseHex }}
        />

        <div className="absolute inset-x-0 bottom-4 px-4 text-center">
          <div
            className="text-[22px] font-black uppercase tracking-wide"
            style={{ color: accentHex }}
          >
            {text}
          </div>
          <div
            className="mt-2 text-xs font-semibold uppercase tracking-[0.18em]"
            style={{ color: accentHex }}
          >
            {cardStopStyle === "raised-text-stop"
              ? "Raised Text Stop"
              : "Solid Front Lip"}
          </div>
        </div>
      </div>
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