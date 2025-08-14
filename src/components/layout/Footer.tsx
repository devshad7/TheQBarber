"use client";

import {
  House,
  Map,
  Scissors,
  UserRound,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer className="fixed left-0 bottom-0 bg-white shadow-[0_-1px_5px_rgba(0,0,0,0.05)] text-center pt-4 pb-6 w-full z-50">
      <div className="max-w-7xl mx-auto px-5">
        <div className="flex justify-around items-center text-gray-400">
          <Link
            href={"/"}
            className={
              pathname === "/"
                ? "flex flex-col items-center text-xs text-yellow-600"
                : "flex flex-col items-center text-xs"
            }
          >
            <House />
            <span className="font-semibold">Home</span>
          </Link>
          <Link
            href={"/dashboard/explore"}
            className={
              pathname === "/dashboard/explore"
                ? "flex flex-col items-center text-xs text-yellow-600"
                : "flex flex-col items-center text-xs"
            }
          >
            <Map />
            <span className="font-semibold">Explore</span>
          </Link>
          <Link
            href={"/dashboard/bookings"}
            className={
              pathname === "/dashboard/bookings"
                ? "flex flex-col items-center text-xs text-yellow-600"
                : "flex flex-col items-center text-xs"
            }
          >
            <Scissors />
            <span className="font-semibold">Bookings</span>
          </Link>
          <Link
            href={"/dashboard/account"}
            className={
              pathname === "/dashboard/account"
                ? "flex flex-col items-center text-xs text-yellow-600"
                : "flex flex-col items-center text-xs"
            }
          >
            <UserRound />
            <span className="font-semibold">Account</span>
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
