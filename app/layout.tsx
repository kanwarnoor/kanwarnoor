import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Braah_One, Inter, Oswald } from "next/font/google";
import "./globals.css";
import Loader from "@/components/Loader";
import Navbar from "@/components/Navbar";
import Transition from "@/components/Transition";
import { Provider } from "@/context/provider";
import { Analytics } from "@vercel/analytics/next";
// import Player from "@/components/Player";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  variable: "--font-inter",
});

const bebas = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
});
const braah = Braah_One({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-braah",
});
const oswald = Oswald({
  weight: ["200", "400", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const metadata: Metadata = {
  title: "Kanwarnoor",
  description: "Personal website of Kanwarnoor",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${bebas.variable} ${braah.variable} ${oswald.variable} text-white antialiased bg-black`}
      >
        <Provider>
          {/* <Navbar /> */}

          <Loader />
          {/* <Transition /> */}
          <Navbar />
          {/* <Player/> */}

          {children}
        </Provider>
        <Analytics />
      </body>
    </html>
  );
}
