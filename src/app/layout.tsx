import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Footer from "@/components/layout/Footer";
import { PageTransition } from "@/components/PageTransition";

export const metadata: Metadata = {
  title: "TheQBarber | Smart Queue & Appointment System for Barbershops",
  description:
    "TheQBarber is an online barber queue and appointment booking system. Manage walk-ins, reduce wait times, and streamline your barbershop experience.",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="text-[#363636]" suppressHydrationWarning>
          <PageTransition>{children}</PageTransition>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
