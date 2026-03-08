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
              presentation setups.
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

            <div className="mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
              <HeroStat title="Custom Built" text="Made for branded presentation" />
              <HeroStat title="Premium Finish" text="Designed to look high-end" />
              <HeroStat title="Multi-Color" text="Segmented color options available" />
            </div>
          </div>

          <div className="flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[660px]">
              <div className="absolute left-1/2 top-[88%] h-16 w-[70%] -translate-x-1/2 rounded-full bg-black/10 blur-3xl" />
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
              Designed to look premium before your customer even touches it.
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              Every stand is built to present your brand, products, or collection
              in a cleaner, more professional way.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            <ValueCard
              title="Brand-First Design"
              text="Custom text, logos, and premium presentation choices built around your identity."
            />
            <ValueCard
              title="Premium Multi-Color Builds"
              text="Color-separated elements and custom finishes create a stronger premium feel."
            />
            <ValueCard
              title="Collector & Retail Ready"
              text="Built for card shops, vendors, collectors, counters, and event displays."
            />
            <ValueCard
              title="Manufacturing-Conscious"
              text="Customization is designed within real production limits to keep builds printable and clean."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
            Featured Products
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Premium stand styles for your setup.
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600">
            Starting price guidance helps set expectations early, while final
            pricing adjusts based on materials, colors, and design complexity.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr_0.85fr]">
          <FeaturedProduct
            image="/products/rams-front.png"
            title="Business Card Stands"
            price="Starting at $24"
            text="Clean branded desk displays for counters, offices, receptions, and vendor tables."
            href="/customization"
            large
          />

          <FeaturedProduct
            image="/products/elite-closeup.png"
            title="Card & TCG Stands"
            price="Starting at $20"
            text="Small universal display stands for raw cards, sleeves, top loaders, one touches, and slabs."
            href="/customization"
          />

          <FeaturedProduct
            image="/products/scorebig-box.png"
            title="Premium Multi-Color Builds"
            price="Custom quote"
            text="Advanced segmented builds, stronger branding, and presentation-focused finishes."
            href="/order"
          />
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/70">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="mb-12 max-w-3xl">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
              Product Examples
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight">
              Real custom stands built for real brands.
            </h2>
            <p className="mt-4 text-lg leading-8 text-neutral-600">
              A closer look at branded display work created for counters,
              collectors, product presentation, and retail setups.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <GalleryCard
              image="/products/rams-angle.png"
              title="Premium Angled Display"
              text="A cleaner, more editorial product look with strong brand presence."
            />
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
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="rounded-[36px] border border-neutral-200 bg-white p-8 shadow-[0_24px_70px_rgba(0,0,0,0.05)] md:p-12">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto]">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Ready to build?
              </p>
              <h2 className="mt-4 text-4xl font-bold tracking-tight">
                Start your custom stand with premium options built in.
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
      <p className="mt-4 text-neutral-600 leading-7">{text}</p>
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
    <div
      className={`rounded-[32px] border border-neutral-200 bg-white p-5 shadow-sm ${
        large ? "lg:row-span-1" : ""
      }`}
    >
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

      <div className="mt-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold tracking-tight">{title}</h3>
          <p className="mt-2 text-sm font-semibold uppercase tracking-[0.2em] text-sky-700">
            {price}
          </p>
        </div>
      </div>

      <p className="mt-4 text-neutral-600 leading-7">{text}</p>

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
      <p className="mt-3 text-neutral-600 leading-7">{text}</p>
    </div>
  );
}