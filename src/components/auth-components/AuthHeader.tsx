import Link from "next/link";
import Image from "next/image";
import { MaxWidth } from "../MaxWidth";
import { MobileNav } from "../MobileNav";

export function AuthHeader() {
  return (
    <header className="z-50 relative ">
      <MaxWidth>
        <div className="flex items-center justify-between gap-5 lg:gap-10 ">
          <nav className="text-sm lg:text-base hidden md:block">
            <ul className="flex items-center md:gap-2 lg:gap-5 uppercase">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/shop">Shop</Link>
              </li>
              <li>
                <Link href="/editorial">Editorial</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
              <li>
                <Link href="/login">Login</Link>
              </li>
              <li>
                <Link href="/register">Register</Link>
              </li>
            </ul>
          </nav>
          <div className="relative w-[58px] h-[64px] sm:w-[117px] sm:h-[124px]">
            <Image src="/logo1.svg" alt="Logo" fill />
          </div>
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </MaxWidth>
    </header>
  );
}
