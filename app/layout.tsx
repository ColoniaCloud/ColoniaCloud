import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--cc-font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Colonia Cloud",
  description: "Llevamos tu negocio a la nube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={dmSans.variable}>
        <Navbar />
        <main style={{ paddingTop: 58 }}>{children}</main>
      </body>
    </html>
  );
}
