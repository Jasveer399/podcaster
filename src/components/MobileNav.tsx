"use client";
import React from "react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import Image from "next/image";
import Link from "next/link";
import { sidebarLinks } from "@/utils";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function MobileNav() {
  const pathname = usePathname();
  return (
    <Sheet>
      <SheetTrigger>
        <Image
          src="/icons/hamburger.svg"
          alt="hamburger"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </SheetTrigger>
      <SheetContent side="left" className="border-none bg-black-1 rounded-md">
        <SheetHeader>
          <Link
            href="/"
            className="flex gap-2 cursor-pointer items-center pb-10 pl-6"
          >
            <Image
              src="/icons/logo.svg"
              alt="App-Logo"
              width={27}
              height={27}
            />
            <h1 className="text-white-1 font-extrabold text-24 ml-2">
              Podcaster
            </h1>
          </Link>
          <div className="flex h-[calc(100vh-72px)] flex-col justify-between overflow-y-auto">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 text-white-1">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose asChild key={item.route}>
                      <Link
                        href={item.route}
                        className={cn(
                          "flex gap-3 cursor-pointer items-center py-3 max-lg:px-4  justify-start",
                          {
                            "bg-nav-focus border-r-4 border-orange-1": isActive,
                          },
                          {
                            "mb-5": item.id === sidebarLinks.length,
                          }
                        )}
                      >
                        <Image
                          src={item.icon}
                          alt={item.label}
                          width={27}
                          height={27}
                        />

                        <p>{item.label}</p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
