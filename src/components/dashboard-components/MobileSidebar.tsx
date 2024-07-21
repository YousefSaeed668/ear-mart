"use client";
import { SIDEBAR_LINKS } from "@/constants";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { signOut } from "next-auth/react";

export function MobileSidebar() {
  const pathname = usePathname();
  return (
    <div className="fixed bottom-0 left-0 h-14 w-full flex items-center border-t bg-lightGrayColor shadow-xl max-[550px]:justify-between min-[550px]:gap-4 justify-center md:hidden px-5">
      {SIDEBAR_LINKS.map((link) => {
        if (link.title === "Logout") {
          return (
            <Button
              key={link.title}
              className={`flex items-center justify-start gap-4 p-3 rounded-lg hover:bg-darkGrayColor hover:text-black transition ${
                pathname === link.href
                  ? "bg-darkGrayColor text-black"
                  : "text-darkBlueColor"
              }`}
              variant="ghost"
              onClick={() => signOut()}
            >
              {link.icon}
            </Button>
          );
        }
        return (
          <Button
            asChild
            key={link.title}
            variant="ghost"
            className={`flex items-center justify-start gap-4 p-3 rounded-lg hover:bg-darkGrayColor hover:text-black transition ${
              pathname === link.href
                ? "bg-darkGrayColor text-black"
                : "text-darkBlueColor"
            }`}
          >
            <Link href={link.href}>{link.icon}</Link>
          </Button>
        );
      })}
    </div>
  );
}
