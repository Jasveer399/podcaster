import { headers } from "next/headers";
import Link from "next/link";
import React from "react";

function Header({
  headertitle,
  className,
}: {
  headertitle?: string;
  className?: string;
}) {
  return (
    <header className="text-white-1 flex justify-between items-center">
      {headertitle ? <h1 className="text-white-1">{headertitle}</h1> : <div />}
      <Link href='/discover' className="text-16 text-orange-1">See all</Link>
    </header>
  );
}

export default Header;
