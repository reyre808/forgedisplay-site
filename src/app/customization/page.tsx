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

const BUSINESS_CARD_BASE_PRICE = 40;
const CARD_STAND_BASE_PRICE = 45;
const EXTRA_COLOR_PRICE = 5;
const LOGO_UPLOAD_PRICE = 10;
const PREMIUM_FINISH_PRICE = 9;
const MAX_COLORS = 4;

export default function CustomizationPage() {
  const router = useRouter();

  const [productType, setProductType] = useState<ProductType>("business-card");

  const [brandName, setBrandName] = useState("");
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");

  const [baseColor, setBaseColor] = useState("Black");
  const [accentColor, setAccentColor] = useState("White");
  const [thirdColor, setThirdColor] = useState("");
  const [fourthColor, setFourthColor] = useState("");

  const [logoFileName, setLogoFileName] = useState("");
  const [logoStyle, setLogoStyle] = useState<BusinessLogoStyle>("raised");
  const [logoPlacement, setLogoPlacement] =
    useState<BusinessLogoPlacement>("front");

  const [cardStopStyle, setCardStopStyle] =
    useState<CardStopStyle>("raised-text-stop");

  const [premiumFinish, setPremiumFinish] = useState(false);
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

  const selectedColors = useMemo(() => {
    return [baseColor, accentColor, thirdColor, fourthColor].filter(Boolean);
  }, [baseColor, accentColor, thirdColor, fourthColor]);

  const uniqueColors = useMemo(() => {
    return Array.from(new Set(selectedColors));
  }, [selectedColors]);

  const extraColorCount = useMemo(() => {
    return Math.max(0, uniqueColors.length - 1);
  }, [uniqueColors]);

  const basePrice = useMemo(() => {
    return productType === "business-card"
      ? BUSINESS_CARD_BASE_PRICE
      : CARD_STAND_BASE_PRICE;
  }, [productType]);

  const extraColorCharge = extraColorCount * EXTRA_COLOR_PRICE;
  const logoCharge = logoFileName ? LOGO_UPLOAD_PRICE : 0;
  const premiumFinishCharge = premiumFinish ? PREMIUM_FINISH_PRICE : 0;

  const estimatedPrice =
    basePrice + extraColorCharge + logoCharge + premiumFinishCharge;

  const baseHex = colors.find((c) => c.name === baseColor)?.hex ?? "#111111";
  const accentHex = colors.find((c) => c.name === accentColor)?.hex ?? "#F5F5F5";
  const thirdHex = colors.find((c) => c.name === thirdColor)?.hex ?? accentHex;
  const fourthHex = colors.find((c) => c.name === fourthColor)?.hex ?? accentHex;

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
      thirdColor,
      fourthColor,
      uniqueColors,
      logoFileName,
      logoStyle,
      logoPlacement,
      cardStopStyle,
      premiumFinish,
      notes,
      forgeDisplaySignature: true,
      signaturePlacement: "Underside of base",
      pricing: {
        basePrice,
        extraColorCount,
        extraColorCharge,
        logoCharge,
        premiumFinishCharge,
        estimatedPrice,
      },
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
          <p className="mt-5 text-lg leading-8 text-neutral-600">
            Choose from approved product options, color zones, and premium
            upgrades. Your design preview and estimated price update in real
            time.
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
                <ReadOnlyField label="Selected Product" value={summaryTitle} />
                <ReadOnlyField label="Size" value={sizeLabel} />
                <ReadOnlyField
                  label="Production Model"
                  value={
                    productType === "business-card"
                      ? "Business Card Holder Master V1"
                      : "Small Universal Card Stand"
                  }
                />
                <ReadOnlyField
                  label="Starting Price"
                  value={`$${basePrice}`}
                />
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 3"
                title="Brand text"
                text={
                  productType === "business-card"
                    ? "Use multiple lines if needed. Designs must stay inside approved printable limits."
                    : "Raised front text can be used as part of the card stop design on supported models."
                }
              />

              <div className="mt-6 grid gap-5">
                <Field label="Brand / Business Name">
                  <input
                    value={brandName}
                    onChange={(e) => setBrandName(e.target.value)}
                    placeholder="Example: Robs Card Shop"
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
                  <InfoBox>
                    <ul className="space-y-2">
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
                  </InfoBox>
                ) : (
                  <InfoBox>
                    <ul className="space-y-2">
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
                  </InfoBox>
                )}
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 4"
                title="Logo and premium options"
                text="Choose how your branding is applied and whether you want a premium finish."
              />

              <div className="mt-6 grid gap-5">
                <Field label="Upload Logo (+$10)">
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
                      value="Finalized within approved printable zones"
                    />
                  </div>
                )}

                <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="font-semibold text-neutral-950">
                        Premium Finish (+$9)
                      </p>
                      <p className="mt-1 text-sm text-neutral-500">
                        Adds a higher-end upgraded finish tier across all stand
                        types.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setPremiumFinish((prev) => !prev)}
                      className={`inline-flex min-w-[110px] items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
                        premiumFinish
                          ? "bg-black text-white"
                          : "border border-neutral-300 bg-white text-neutral-900 hover:bg-neutral-50"
                      }`}
                    >
                      {premiumFinish ? "Added" : "Add Finish"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-[30px] border border-neutral-200 bg-white p-6 shadow-sm">
              <SectionTitle
                eyebrow="Step 5"
                title="Colors"
                text={`Choose up to ${MAX_COLORS} total colors. Every additional color beyond the first adds $${EXTRA_COLOR_PRICE}.`}
              />

              <div className="mt-6 grid gap-8">
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

                <ColorSelector
                  label="Third Color (Optional)"
                  value={thirdColor}
                  onChange={setThirdColor}
                  optional
                />

                <ColorSelector
                  label="Fourth Color (Optional)"
                  value={fourthColor}
                  onChange={setFourthColor}
                  optional
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
                      thirdHex={thirdHex}
                      fourthHex={fourthHex}
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
                <SummaryRow label="Colors Used" value={uniqueColors.join(", ")} />
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

                <PricingBlock
                  basePrice={basePrice}
                  extraColorCount={extraColorCount}
                  extraColorCharge={extraColorCharge}
                  logoCharge={logoCharge}
                  premiumFinishCharge={premiumFinishCharge}
                  estimatedPrice={estimatedPrice}
                />
              </div>

              <div className="mt-8 rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
                <p className="font-semibold text-neutral-900">
                  Pricing Structure
                </p>
                <ul className="mt-3 space-y-2">
                  <li>• Business Card Stand base price: $40</li>
                  <li>• Sports Card / TCG Stand base price: $45</li>
                  <li>• Extra colors: $5 each</li>
                  <li>• Logo upload: $10</li>
                  <li>• Premium finish: $9</li>
                  <li>• Maximum color count: 4 total</li>
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

function InfoBox({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4 text-sm text-neutral-600">
      {children}
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
  optional = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  optional?: boolean;
}) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-neutral-700">{label}</p>
        {optional && value && (
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-xs font-semibold uppercase tracking-[0.18em] text-neutral-500 hover:text-black"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {colors.map((color) => (
          <button
            key={color.name}
            type="button"
            onClick={() => onChange(color.name)}
            className={`rounded-2xl border p-3 text-left transition ${
              value === color.name
                ? "border-black bg-black text-white shadow-[0_12px_30px_rgba(0,0,0,0.16)]"
                : "border-neutral-200 bg-white text-neutral-900 hover:border-neutral-400"
            }`}
          >
            <div className="flex flex-col gap-3">
              <span
                className="h-10 w-full rounded-xl border border-black/10"
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

function PricingBlock({
  basePrice,
  extraColorCount,
  extraColorCharge,
  logoCharge,
  premiumFinishCharge,
  estimatedPrice,
}: {
  basePrice: number;
  extraColorCount: number;
  extraColorCharge: number;
  logoCharge: number;
  premiumFinishCharge: number;
  estimatedPrice: number;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-neutral-50 p-5">
      <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
        Estimated Price
      </p>

      <div className="mt-4 space-y-3">
        <PriceRow label="Base Stand" value={basePrice} />
        <PriceRow
          label={`Extra Colors (${extraColorCount})`}
          value={extraColorCharge}
        />
        <PriceRow label="Logo Upload" value={logoCharge} />
        <PriceRow label="Premium Finish" value={premiumFinishCharge} />
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-neutral-300 pt-4">
        <span className="text-base font-semibold text-neutral-950">
          Estimated Total
        </span>
        <span className="text-2xl font-black tracking-tight text-neutral-950">
          ${estimatedPrice}
        </span>
      </div>
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

function BusinessCardPreview({
  brandName,
  line1,
  line2,
  line3,
  baseHex,
  accentHex,
  thirdHex,
  fourthHex,
}: {
  brandName: string;
  line1: string;
  line2: string;
  line3: string;
  baseHex: string;
  accentHex: string;
  thirdHex: string;
  fourthHex: string;
}) {
  const mainText = brandName || line1 || "YOUR BRAND";
  const lowerText = [line1, line2, line3].filter(Boolean).slice(0, 2);

  return (
    <div className="relative w-full max-w-[430px]">
      <div className="absolute left-1/2 top-[84%] h-8 w-56 -translate-x-1/2 rounded-full bg-black/15 blur-2xl" />
      <div
        className="relative mx-auto h-[220px] w-[370px] rounded-[28px] border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
        style={{ backgroundColor: baseHex }}
      >
        <div
          className="absolute left-1/2 top-[-24px] h-[112px] w-[182px] -translate-x-1/2 rounded-[18px] border border-black/10"
          style={{ backgroundColor: thirdHex }}
        />
        <div className="absolute inset-x-0 bottom-5 px-5 text-center">
          <div
            className="text-[28px] font-black uppercase tracking-wide"
            style={{ color: accentHex }}
          >
            {mainText}
          </div>
          {lowerText.length > 0 && (
            <div
              className="mt-2 text-xs font-semibold uppercase tracking-[0.2em]"
              style={{ color: fourthHex }}
            >
              {lowerText.join(" • ")}
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
    <div className="relative w-full max-w-[430px]">
      <div className="absolute left-1/2 top-[84%] h-8 w-56 -translate-x-1/2 rounded-full bg-black/15 blur-2xl" />
      <div
        className="relative mx-auto h-[180px] w-[365px] rounded-[24px] border border-black/10 shadow-[0_24px_60px_rgba(0,0,0,0.15)]"
        style={{ backgroundColor: baseHex }}
      >
        <div
          className="absolute left-1/2 top-[16px] h-[108px] w-[250px] -translate-x-1/2 rounded-[16px] border border-black/10"
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