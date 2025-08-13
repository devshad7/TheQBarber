import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "TheQBarber | Smart Queue & Appointment System for Barbershops",
  description:
    "TheQBarber is an online barber queue and appointment booking system. Manage walk-ins, reduce wait times, and streamline your barbershop experience.",
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
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
