"use client";

import Navbar from "@/components/Navbar";
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
            <div className="mb-10">
              <p className="text-sm font-medium uppercase tracking-[0.35em] text-neutral-500">
                ForgeDisplay
              </p>
            </div>

            <div className="relative mb-12 flex h-[340px] w-[520px] max-w-full items-center justify-center">
              <div className="absolute bottom-10 h-14 w-72 rounded-full bg-neutral-300/70 blur-3xl" />

              <div className="fd-rotator relative h-[240px] w-[420px]">
                <div className="absolute inset-0 rounded-[38px] border border-neutral-200 bg-gradient-to-b from-white to-neutral-100 p-5 shadow-[0_30px_90px_rgba(0,0,0,0.12)]">
                  <div className="flex h-full flex-col justify-end rounded-[28px] border border-neutral-200 bg-white p-6 shadow-inner">
                    <div className="mb-5 text-center text-xs font-medium uppercase tracking-[0.32em] text-neutral-400">
                      Custom Display Stand
                    </div>

                    <div className="mx-auto mb-5 flex h-20 w-[78%] items-center justify-center rounded-[20px] border border-neutral-200 bg-neutral-950 text-2xl font-black tracking-[0.18em] text-white">
                      FD
                    </div>

                    <div className="mx-auto h-9 w-[58%] rounded-full border border-neutral-200 bg-white" />
                  </div>
                </div>
              </div>
            </div>

            <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
              ForgeDisplay
            </h1>

            <p className="mt-4 text-lg text-neutral-600">
              Custom Display Stands
            </p>

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

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-sm text-neutral-600">
              Custom display stands designed to elevate your brand
            </p>

            <h1 className="mt-6 text-5xl font-bold tracking-tight">
              ForgeDisplay
            </h1>

            <p className="mt-6 text-xl text-neutral-600">
              Premium custom display stands for collectors, card shops, events,
              and branded business setups.
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

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Business
              </p>
              <h2 className="mt-4 text-2xl font-bold">Business Card Stands</h2>
              <p className="mt-3 text-neutral-600">
                Clean branded displays for counters, desks, receptions, and
                storefronts.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:mt-10">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Collector
              </p>
              <h2 className="mt-4 text-2xl font-bold">Card Display Stands</h2>
              <p className="mt-3 text-neutral-600">
                Built for collectors, livestreams, shops, and product
                presentation.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Brand
              </p>
              <h2 className="mt-4 text-2xl font-bold">Custom Branding</h2>
              <p className="mt-3 text-neutral-600">
                Add names, logos, colors, and custom details tailored to your
                brand.
              </p>
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm sm:mt-10">
              <p className="text-sm font-medium uppercase tracking-[0.28em] text-neutral-500">
                Marketing
              </p>
              <h2 className="mt-4 text-2xl font-bold">QR Integration</h2>
              <p className="mt-3 text-neutral-600">
                Turn your stand into a branded marketing tool with integrated QR
                options.
              </p>
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fdSweep {
          0% {
            transform: perspective(1400px) rotateY(-18deg);
          }
          50% {
            transform: perspective(1400px) rotateY(18deg);
          }
          100% {
            transform: perspective(1400px) rotateY(-18deg);
          }
        }

        .fd-rotator {
          animation: fdSweep 3s ease-in-out infinite;
          transform-origin: center center;
          transform-style: preserve-3d;
        }
      `}</style>
    </main>
  );
}