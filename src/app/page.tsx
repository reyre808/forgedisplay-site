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
                className="rounded-2xl bg-black px-8 py-4 text-lg font-semibold text-white transition hover:bg-neutral-800"
              >
                Customize Now
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-sm text-neutral-600">
              Custom display stands designed to elevate your brand
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-6xl">
              ForgeDisplay
            </h1>

            <p className="mt-6 max-w-2xl text-xl text-neutral-600">
              Premium custom display stands for collectors, card shops, events,
              creators, and branded business setups.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="/order"
                className="inline-block rounded-xl bg-black px-8 py-4 font-semibold text-white transition hover:bg-neutral-800"
              >
                Order Custom Stand
              </a>

              <a
                href="/customization"
                className="inline-block rounded-xl border border-neutral-300 px-8 py-4 font-semibold text-neutral-900 transition hover:bg-neutral-50"
              >
                Explore Customization
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="rounded-[32px] border border-neutral-200 bg-white p-4 shadow-[0_30px_80px_rgba(0,0,0,0.08)]">
              <Image
                src="/products/rams-angle.png"
                alt="Custom branded display stand"
                width={700}
                height={700}
                className="h-auto w-full max-w-[520px] rounded-[24px] object-contain"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50/70">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="mb-12">
            <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
              Product Examples
            </p>
            <h2 className="mt-3 text-4xl font-bold tracking-tight">
              Real custom stands built for real brands
            </h2>
            <p className="mt-4 max-w-2xl text-lg text-neutral-600">
              Business card stands, collector displays, and branded product
              presentation pieces built to make your setup look professional.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            <GalleryCard
              image="/products/rams-front.png"
              title="Branded Counter Display"
              text="Clean front-facing custom branding for desks, counters, and retail spaces."
            />
            <GalleryCard
              image="/products/rams-side.png"
              title="Angled Product View"
              text="Shows the shape, depth, and quality of the stand from a premium angle."
            />
            <GalleryCard
              image="/products/scorebig-holder.png"
              title="Business Card Holder"
              text="Built for business cards, counter displays, and brand visibility."
            />
            <GalleryCard
              image="/products/scorebig-box.png"
              title="Box and Product Display"
              text="Designed to support product boxes and elevate merchandise presentation."
            />
            <GalleryCard
              image="/products/elite-closeup.png"
              title="Custom Name Display"
              text="Bold branded lettering for shops, creators, livestreams, and event tables."
            />
            <GalleryCard
              image="/products/rams-angle.png"
              title="Collector and Shop Use"
              text="Ideal for collector setups, card shows, vendor booths, and custom storefronts."
            />
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
          width={700}
          height={700}
          className="h-auto w-full rounded-[22px] object-contain"
        />
      </div>
      <h3 className="mt-5 text-2xl font-bold tracking-tight">{title}</h3>
      <p className="mt-3 text-neutral-600">{text}</p>
    </div>
  );
}