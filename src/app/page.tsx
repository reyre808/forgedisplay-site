"use client";

import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [showCTA, setShowCTA] = useState(false);
  const [entered, setEntered] = useState(true);
  const [checkingIntro, setCheckingIntro] = useState(true);

  useEffect(() => {
    const hasSeenIntro = window.sessionStorage.getItem("fd-intro-seen");

    if (!hasSeenIntro) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setEntered(false);

      const timer = window.setTimeout(() => {
        setShowCTA(true);
        setCheckingIntro(false);
      }, 3000);

      return () => window.clearTimeout(timer);
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCheckingIntro(false);
  }, []);

  function enterSite() {
    window.sessionStorage.setItem("fd-intro-seen", "true");
    setEntered(true);
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-950">
      {!checkingIntro && !entered && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center px-6 text-center">
            <div className="relative mb-10 flex items-center justify-center">
              <div className="absolute top-[82%] h-12 w-72 rounded-full bg-black/10 blur-2xl" />
              <div className="fd-logo-rotator">
                <Image
                  src="/logo/forgedisplay-logo-transparent.png"
                  alt="ForgeDisplay"
                  width={700}
                  height={700}
                  priority
                  className="h-auto w-[300px] sm:w-[420px] md:w-[520px]"
                />
              </div>
            </div>

            <p className="text-lg text-neutral-600">Custom Display Stands</p>

            <div
              className={`mt-8 transition-all duration-700 ${
                showCTA ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
              }`}
            >
              <button
                onClick={enterSite}
                className="rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.16)] transition hover:bg-neutral-800 hover:translate-y-[-1px]"
              >
                Customize Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      <section className="mx-auto max-w-7xl px-6 pb-24 pt-16 md:pt-24">
        <div className="grid items-center gap-16 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-sm font-medium text-neutral-600">
              Premium custom display stands
            </p>

            <h1 className="mt-8 max-w-3xl text-5xl font-bold tracking-tight sm:text-6xl xl:text-7xl">
              Custom display stands built to elevate your brand.
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-8 text-neutral-600">
              Designed for collectors, card shops, counters, events, and premium
              product presentation.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="/customization"
                className="inline-flex items-center justify-center rounded-2xl bg-black px-8 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition hover:bg-neutral-800 hover:translate-y-[-1px]"
              >
                Start Custom Build
              </a>

              <a
                href="/order"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-8 py-4 text-base font-semibold text-neutral-900 transition hover:bg-neutral-50"
              >
                Request a Quote
              </a>
            </div>

            <div className="mt-12 grid max-w-2xl gap-4 sm:grid-cols-3">
              <HeroStat title="Custom Built" text="Made for real branded presentation" />
              <HeroStat title="Premium Finish" text="Designed to look more expensive" />
              <HeroStat title="Multi-Color" text="Expanded upgrade options available" />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[680px]">
              <div className="absolute left-1/2 top-[88%] h-16 w-[72%] -translate-x-1/2 rounded-full bg-black/10 blur-3xl" />
              <div className="rounded-[36px] border border-neutral-200 bg-white p-5 shadow-[0_35px_100px_rgba(0,0,0,0.09)]">
                <Image
                  src="/products/rams-angle.png"
                  alt="ForgeDisplay custom display stand"
                  width={1200}
                  height={1200}
                  priority
                  className="h-auto w-full rounded-[28px] object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-neutral-200 bg-neutral-50/80">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
              Why ForgeDisplay
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Built to make your setup look more premium before anyone even picks it up.
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              ForgeDisplay stands are designed to help shops, collectors,
              brands, and sellers present themselves in a cleaner, more
              professional way.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ValueCard
              title="Brand-First Design"
              text="Custom text, logos, and layout choices are built around strong visual presentation."
            />
            <ValueCard
              title="Premium Multi-Color Builds"
              text="Segmented colors and upgraded finishes create a more custom, high-end result."
            />
            <ValueCard
              title="Collector & Retail Ready"
              text="Ideal for card shops, vendor booths, counters, desks, and showcase setups."
            />
            <ValueCard
              title="Production-Conscious"
              text="Customization is designed inside real manufacturing limits so every build stays achievable."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
            Featured Stand Types
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Premium builds with clear starting points.
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            Starting prices help set expectations early, while final pricing
            adjusts based on colors, logos, and premium upgrades.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
          <FeaturedProduct
            image="/products/rams-front.png"
            title="Business Card Stands"
            price="Starting at $40"
            text="Custom branded desk displays for counters, receptions, offices, vendors, and premium business presentation."
            href="/customization"
            large
          />

          <FeaturedProduct
            image="/products/elite-closeup.png"
            title="Sports Card & TCG Stands"
            price="Starting at $45"
            text="Small universal stands for raw cards, sleeves, top loaders, one touches, and graded slabs."
            href="/customization"
          />

          <FeaturedProduct
            image="/products/scorebig-box.png"
            title="Premium Multi-Color Builds"
            price="Premium add-ons available"
            text="Extra colors, logo uploads, and upgraded finishes are available to create more elevated custom builds."
            href="/order"
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
              Featured Builds
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Real examples built for real brands.
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              A closer look at custom stands created for counters, collectors,
              product presentation, and premium retail setups.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="rounded-[32px] border border-neutral-200 bg-white p-5 shadow-sm">
              <div className="rounded-[24px] bg-white">
                <Image
                  src="/products/rams-angle.png"
                  alt="Premium angled branded display"
                  width={1200}
                  height={1200}
                  className="h-auto w-full rounded-[24px] object-contain"
                />
              </div>
              <div className="mt-6">
                <p className="text-sm font-medium uppercase tracking-[0.2em] text-neutral-500">
                  Featured Example
                </p>
                <h3 className="mt-3 text-3xl font-bold tracking-tight">
                  RamsCardShop Premium Angled Display
                </h3>
                <p className="mt-4 max-w-2xl text-neutral-600 leading-7">
                  A strong example of clean front branding, premium contrast,
                  and a shape that feels much more elevated than a generic desk
                  display.
                </p>
              </div>
            </div>

            <div className="grid gap-6">
              <GalleryCard
                image="/products/scorebig-holder.png"
                title="Business Card Holder"
                text="Designed for counters, reception desks, and front-facing business presentation."
              />
              <GalleryCard
                image="/products/rams-side.png"
                title="Product Form & Depth"
                text="Side and angle views help highlight quality, structure, and overall finish."
              />
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <GalleryCard
              image="/products/rams-front.png"
              title="Front Branding Focus"
              text="A clean front-facing presentation built to make the brand the centerpiece."
            />
            <GalleryCard
              image="/products/elite-closeup.png"
              title="Custom Name Display"
              text="Bold custom lettering creates a stronger premium presence for shops and creators."
            />
            <GalleryCard
              image="/products/scorebig-box.png"
              title="Product & Box Display"
              text="Supports product presentation while keeping branding clean and intentional."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.05)] md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Ready to build?
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Start your custom stand with premium options already built in.
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-neutral-600">
                Choose your stand type, colors, text, and branding preferences,
                then submit your request through the ForgeDisplay customizer.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href="/customization"
                className="inline-flex items-center justify-center rounded-2xl bg-black px-8 py-4 text-base font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.14)] transition hover:bg-neutral-800 hover:translate-y-[-1px]"
              >
                Open Customizer
              </a>
              <a
                href="/order"
                className="inline-flex items-center justify-center rounded-2xl border border-neutral-300 px-8 py-4 text-base font-semibold text-neutral-900 transition hover:bg-neutral-50"
              >
                Request Quote
              </a>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fdLogoRotate {
          0% {
            transform: perspective(1200px) rotateY(-10deg);
          }
          50% {
            transform: perspective(1200px) rotateY(10deg);
          }
          100% {
            transform: perspective(1200px) rotateY(-10deg);
          }
        }

        .fd-logo-rotator {
          animation: fdLogoRotate 3s ease-in-out infinite;
          transform-origin: center center;
          transform-style: preserve-3d;
        }
      `}</style>
    </main>
  );
}

function HeroStat({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="text-xl font-bold tracking-tight">{title}</div>
      <div className="mt-2 text-sm leading-6 text-neutral-600">{text}</div>
    </div>
  );
}

function ValueCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
      <p className="mt-4 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}

function FeaturedProduct({
  image,
  title,
  price,
  text,
  href,
  large = false,
}: {
  image: string;
  title: string;
  price: string;
  text: string;
  href: string;
  large?: boolean;
}) {
  return (
    <div className="rounded-[32px] border border-neutral-200 bg-white p-5 shadow-sm">
      <div className="rounded-[24px] bg-white">
        <Image
          src={image}
          alt={title}
          width={1200}
          height={1200}
          className={`h-auto w-full rounded-[24px] object-contain ${
            large ? "max-h-[460px]" : "max-h-[340px]"
          }`}
        />
      </div>

      <div className="mt-6">
        <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
        <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
          {price}
        </p>
        <p className="mt-4 leading-7 text-neutral-600">{text}</p>
      </div>

      <a
        href={href}
        className="mt-6 inline-flex items-center justify-center rounded-xl border border-neutral-300 px-5 py-3 text-sm font-semibold text-neutral-900 transition hover:bg-neutral-50"
      >
        Explore
      </a>
    </div>
  );
}

function GalleryCard({
  image,
  title,
  text,
}: {
  image: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[28px] border border-neutral-200 bg-white p-4 shadow-sm">
      <div className="rounded-[22px] bg-white">
        <Image
          src={image}
          alt={title}
          width={900}
          height={900}
          className="h-auto w-full rounded-[22px] object-contain"
        />
      </div>
      <h3 className="mt-5 text-2xl font-bold tracking-tight">{title}</h3>
      <p className="mt-3 leading-7 text-neutral-600">{text}</p>
    </div>
  );
}