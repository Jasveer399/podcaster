"use client";

import React, { useEffect, useState } from "react";
import { Input } from "./ui/input";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useDebounce } from "@/utils/useDebounce";

function Searchbar() {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedValue) {
      router.push(`/discover?search=${debouncedValue}`);
    } else if (!debouncedValue && pathname === "/discover")
      router.push("/discover");
  }, [router, pathname, debouncedValue]);
  return (
    <div className="relative mt-8 block">
      <Input
        className="input-class py-6 pl-12"
        placeholder="Search Podcast"
        onChange={(e) => setSearch(e.target.value)}
        onLoad={() => setSearch("")}
      />
      <Image
        src="/icons/search.svg"
        alt="Search icon"
        width={20}
        height={20}
        className="absolute left-4 top-3.5"
      />
    </div>
  );
}

export default Searchbar;
