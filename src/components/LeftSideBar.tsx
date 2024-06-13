"use client";
import { cn } from "@/lib/utils";
import { sidebarLinks } from "@/utils";
import { SignedIn, SignedOut, useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

const LeftSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { signOut } = useClerk();
  const { user } = useUser();
  return (
    <section className="left_sidebar">
      <nav className="flex flex-col gap-6">
        <Link
          href="/"
          className="flex gap-1 cursor-pointer items-center pb-10 max-lg:justify-center"
        >
          <Image src="/icons/logo.svg" alt="App-Logo" width={27} height={27} />
          <h1 className="text-white-1 font-extrabold max-lg:hidden text-24 ml-2">
            Podcaster
          </h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              href={item.id === 4 ? item.route + "/" + user?.id : item.route}
              key={item.id}
              className={cn(
                "flex gap-3 cursor-pointer items-center py-3 max-lg:px-4 justify-center lg:justify-start",
                { "bg-nav-focus border-r-4 border-orange-1": isActive },
                {
                  "mb-5": item.id === sidebarLinks.length,
                }
              )}
            >
              <Image src={item.icon} alt={item.label} width={27} height={27} />

              <p>{item.label}</p>
            </Link>
          );
        })}
      </nav>
      <SignedOut>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button className="text-white-1 w-full bg-orange-1 py-2 px-4 rounded-md">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </SignedOut>
      <SignedIn>
        <div className="flex-center w-full pb-14 max-lg:px-4 lg:pr-8">
          <Button
            className="text-white-1 w-full bg-orange-1 py-2 px-4 rounded-md"
            onClick={() => signOut(() => router.push("/"))}
          >
            Log Out
          </Button>
        </div>
      </SignedIn>
    </section>
  );
};

export default LeftSideBar;
