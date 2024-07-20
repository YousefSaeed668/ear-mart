"use client";

import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { SIDEBAR_LINKS } from "@/constants";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  //TODO: Add loading Skeleton
  if (status === "loading") return null;
  return (
    <div className="bg-lightGrayColor shadow-md px-5 py-6 h-screen  flex-col justify-between hidden md:flex font-poppins font-medium">
      <div className="flex mb-10 justify-center">
        <Image src="/logo1.svg" width={100} height={100} alt="logo" />
      </div>
      <div className="flex flex-col gap-3 flex-grow">
        {SIDEBAR_LINKS.map((link) => {
          if (link.title === "Logout") {
            return (
              <Button
                key={link.title}
                className={`flex items-center justify-start text-base gap-4  p-3 rounded-lg hover:bg-darkGrayColor hover:text-black transition ${
                  pathname === link.href
                    ? "bg-darkGrayColor text-black"
                    : "text-darkBlueColor"
                }`}
                variant="ghost"
                onClick={() => signOut()}
              >
                {link.icon}
                <span>{link.title}</span>
              </Button>
            );
          }

          return (
            <Link
              key={link.title}
              href={link.href}
              className={`flex items-center gap-4 p-3 rounded-lg hover:bg-darkGrayColor hover:text-black transition ${
                pathname === link.href
                  ? "bg-darkGrayColor text-black"
                  : "text-darkBlueColor"
              }`}
            >
              {link.icon}
              <span>{link.title}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex gap-3 mt-auto" id="jo">
        <Image src="/avatar.svg" width={35} height={35} alt="logo" />
        <div className="leading-tight">
          <h4 className="font-medium tracking-tight capitalize">
            {session?.user?.name}
          </h4>
          <span className="text-[#6B7280]">{session?.user?.email}</span>
        </div>
      </div>
    </div>
  );
}
