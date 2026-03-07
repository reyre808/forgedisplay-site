"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [showCTA, setShowCTA] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowCTA(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-neutral-950">
      {/* INTRO OVERLAY */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-1000 ${
          entered
            ? "pointer-events-none opacity-0"
            : "pointer-events-auto opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white via-neutral-50 to-white" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.05),transparent_45%)]" />

        <div className="relative flex min-h-screen items-center justify-center px-6">
          <div className="w-full max-w-6xl">
            <div className="mb-10 text-center">
              <div className="inline-flex rounded-full border border-neutral-200 bg-white px-4 py-1 text-sm text-neutral-600 shadow-sm">
                ForgeDisplay premium product intro
              </div>
            </div>

            <div className="relative flex min-h-[640px] items-center justify-center overflow-hidden rounded-[40px] border border-neutral-200 bg-white shadow-[0_30px_100px_rgba(0,0,0,0.08)]">
              <div className="absolute left-8 top-8 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-500 shadow-sm">
                3-second stand reveal
              </div>

              <div className="absolute right-8 top-8 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm text-neutral-500 shadow-sm">
                Front-facing slow rotation
              </div>

              <div className="relative flex h-full w-full items-center justify-center px-6">
                <div className="absolute bottom-24 left-1/2 h-16 w-[360px] -translate-x-1/2 rounded-full bg-neutral-300/70 blur-3xl" />

                <div className="fd-rotator relative h-[360px] w-[520px] [transform-style:preserve-3d]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative h-[250px] w-[420px] rounded-[38px] border border-neutral-200 bg-gradient-to-b from-white to-neutral-100 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.14)]">
                      <div className="absolute inset-4 rounded-[30px] border border-neutral-200 bg-white p-6">
                        <div className="flex h-full flex-col justify-end rounded-[24px] border border-neutral-200 bg-gradient-to-b from-white to-neutral-50 p-6 shadow-inner">
                          <div className="mb-5 text-center text-xs font-medium uppercase tracking-[0.32em] text-neutral-400">
                            ForgeDisplay Signature Stand
                          </div>

                          <div className="mx-auto mb-6 flex h-20 w-[78%] items-center justify-center rounded-[20px] border border-neutral-200 bg-neutral-950 text-2xl font-black tracking-[0.18em] text-white shadow-sm">
                            FD
                          </div>

                          <div className="mx-auto h-9 w-[58%] rounded-full border border-neutral-200 bg-white" />

                          <div className="mt-5 flex items-center justify-between text-sm text-neutral-500">
                            <span>Custom branded display</span>
                            <span>Business card / card stand</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`absolute bottom-20 left-1/2 -translate-x-1/2 transition-all duration-700 ${
                    showCTA
                      ? "translate-y-0 opacity-100"
                      : "translate-y-6 opacity-0"
                  }`}
                >
                  <button
                    onClick={() => setEntered(true)}
                    className="rounded-2xl bg-neutral-950 px-8 py-4 text-lg font-semibold text-white shadow-[0_18px_50px_rgba(0,0,0,0.18)] transition hover:translate-y-[-1px]"
                  >
                    Customize Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MAIN HOMEPAGE */}
      <section className="relative border-b border-neutral-200 bg-white">
        <div className="mx-auto grid min-h-screen max-w-7xl items-center gap-12 px-6 py-20 lg:grid-cols-2">
          <div>
            <div className="inline-flex rounded-full border border-neutral-200 bg-neutral-50 px-4 py-1 text-sm text-neutral-600">
              Premium custom 3D printed display stands
            </div>

            <h1 className="mt-6 text-5xl font-black tracking-tight text-neutral-950 sm:text-6xl">
              ForgeDisplay
            </h1>

            <p className="mt-5 max-w-2xl text-lg text-neutral-600">
              Custom business card stands, trading card display stands, and
              branded QR-integrated products built to help your brand stand out.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-2xl bg-neutral-950 px-6 py-3 font-semibold text-white transition hover:translate-y-[-1px]">
                Start Custom Order
              </button>
              <button className="rounded-2xl border border-neutral-200 px-6 py-3 font-semibold text-neutral-950 transition hover:bg-neutral-100">
                Explore Products
              </button>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-black">Custom</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Built for branding
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-black">QR</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Marketing-ready options
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
                <div className="text-2xl font-black">Premium</div>
                <div className="mt-1 text-sm text-neutral-500">
                  Clean modern display feel
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Product
              </div>
              <div className="mt-3 text-2xl font-bold">
                Business Card Stands
              </div>
              <p className="mt-3 text-neutral-600">
                Clean branded desk displays for offices, vendors, and local
                businesses.
              </p>
            </div>

            <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm md:mt-10">
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Product
              </div>
              <div className="mt-3 text-2xl font-bold">
                Trading Card Displays
              </div>
              <p className="mt-3 text-neutral-600">
                Built for sports cards, slabs, livestream setups, and collector
                presentation.
              </p>
            </div>

            <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm">
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Feature
              </div>
              <div className="mt-3 text-2xl font-bold">
                QR Code Integration
              </div>
              <p className="mt-3 text-neutral-600">
                Add permanent QR destinations for websites, socials, reviews,
                and offers.
              </p>
            </div>

            <div className="rounded-[28px] border border-neutral-200 bg-white p-6 shadow-sm md:mt-10">
              <div className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                Future
              </div>
              <div className="mt-3 text-2xl font-bold">
                Full Customization
              </div>
              <p className="mt-3 text-neutral-600">
                This site is being built to support account sign-ins, saved
                orders, and live product customization later.
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
        }
      `}</style>
    </main>
  );
}