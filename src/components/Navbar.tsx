import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 border-b">
      
      <Link href="/" className="flex items-center gap-3">
        <Image
          src="/logo/forgedisplay-logo-white.png"
          alt="ForgeDisplay"
          width={160}
          height={50}
          priority
        />
      </Link>

      <div className="flex items-center gap-8 text-sm font-medium">
        <Link href="/customization">Customization</Link>
        <Link href="/reviews">Reviews</Link>
        <Link href="/contact">Contact</Link>
      </div>

      <Link
        href="/customization"
        className="bg-black text-white px-5 py-2 rounded-lg"
      >
        Customize
      </Link>

    </nav>
  )
}