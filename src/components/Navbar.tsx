"use client";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="text-xl font-black tracking-tight">
          ForgeDisplay
        </div>

        <nav className="flex gap-6 text-sm font-medium text-neutral-700">
          <a href="/customization" className="hover:text-black">
            Customization
          </a>

          <a href="/qr" className="hover:text-black">
            QR Integration
          </a>

          <a href="/reviews" className="hover:text-black">
            Reviews
          </a>

          <a href="/contact" className="hover:text-black">
            Contact
          </a>
        </nav>

        <button className="rounded-xl bg-black px-4 py-2 text-sm font-semibold text-white">
          Customize
        </button>
      </div>
    </header>
  );
}