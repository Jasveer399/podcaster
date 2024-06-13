import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import ConvexClientProvider from "../provider/ConvexClerkProvider";
import AudioProvider from "@/provider/AudioProvider";

const manrope = Manrope({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcaster",
  description: "Generated Podcasts Using AI Voice",
  icons: {
    icon: "/icons/logo.svg", // Corrected path
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ConvexClientProvider>
      <html lang="en">
        <AudioProvider>
          <body className={manrope.className}>{children}</body>
        </AudioProvider>
      </html>
    </ConvexClientProvider>
  );
}
