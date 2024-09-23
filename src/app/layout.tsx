import { Providers } from "@/ctx/providers";
import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Inter, Sarabun, IBM_Plex_Sans, Archivo } from "next/font/google";
import { type Metadata } from "next";

import { TRPCReactProvider } from "trpc/react";
import Nav from "@/ui/nav";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const sarabun = Sarabun({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600"],
  variable: "--font-sarabun",
});

const ibm = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400"],
  variable: "--font-ibm",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-arc",
});

export const metadata: Metadata = {
  title: "AutoProtect",
  description: "The Best Insurance Provider",
  icons: [{ rel: "icon", url: "/svg/logo_ap.svg" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistSans.variable} ${ibm.variable} ${sarabun.variable} ${archivo.variable} antialiased`}
    >
      <body>
        <TRPCReactProvider>
          <Providers>
            <Nav />
            {children}
          </Providers>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
