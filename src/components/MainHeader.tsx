"use client";
import Image from "next/image";
import { MaxWidth } from "./MaxWidth";
import { Heart, Search, ShoppingCart } from "lucide-react";
import Link from "next/link";
import { MobileNav } from "./MobileNav";
import { useSession } from "next-auth/react";
import { UserButton } from "./auth-components/UserButton";

export function MainHeader() {
  const { data: session, status } = useSession();
  if (status === "loading") return null;
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
              {!session && (
                <>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Register</Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
          <div className="relative w-[58px] h-[64px] sm:w-[117px] sm:h-[124px]">
            <Image src="/logo1.svg" alt="Logo" fill />
          </div>

          <div className="flex gap-4 items-center ">
            <div className="flex items-center gap-3 lg:gap-4  justify-end">
              <form className="relative hidden sm:block">
                <input
                  type="text"
                  placeholder="WHAT ARE YOU LOOKING FOR?"
                  className="bg-white rounded-sm lg:w-72 w-56 py-2 px-3 lg:px-4 placeholder:text-xs lg:placeholder:text-sm"
                />
                <Search className="absolute top-1/2 -translate-y-1/2 right-2 text-black h-4 w-4 lg:h-6 lg:w-6" />
              </form>
              <Heart />
              <ShoppingCart />
              {session && <UserButton />}
            </div>

            <div className="md:hidden">
              <MobileNav />
            </div>
          </div>
        </div>
      </MaxWidth>
    </header>
  );
}
