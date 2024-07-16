import { MenuIcon, Search } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import Link from "next/link";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger>
        <MenuIcon className="-mb-1.5" />
      </SheetTrigger>
      <SheetContent>
        <ul className="flex flex-col gap-4 uppercase mt-10">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">Shop</Link>
          </li>
          <li>
            <Link href="#">Editorial</Link>
          </li>
          <li>
            <Link href="#">About</Link>
          </li>
          <li>
            <Link href="#">Login</Link>
          </li>
          <li>
            <Link href="#">Register</Link>
          </li>
          <li>
            <form className="relative ">
              <input
                type="text"
                placeholder="WHAT ARE YOU LOOKING FOR?"
                className="bg-white rounded-sm w-full py-2 px-3 lg:px-4 placeholder:text-xs max-[370px]:placeholder:text-[10px]"
              />
              <Search className="absolute top-1/2 -translate-y-1/2 right-2 text-black h-4 w-4 " />
            </form>
          </li>
        </ul>
      </SheetContent>
    </Sheet>
  );
}
