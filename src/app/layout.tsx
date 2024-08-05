import { Providers } from "@/components/Providers";
import "./globals.css";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import { Inter } from "next/font/google";
import { UserContextProvider } from "@/context/UserContext";

export const metadata: Metadata = {
  title: "Next blog | Home",
  description: "A Next.js blog app where user can read and write blog posts",
};

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`light ${inter.className}`}>
        <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/fav.png" />
        <title>Bloggy</title>

        {/* <ColorSchemeScript/> */}
      </head>
      <Analytics />
      <body>
        <UserContextProvider>
        <Providers>{children}</Providers>
        </UserContextProvider>
      </body>
    </html>
  );
}
