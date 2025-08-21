"use client";

import { Button } from "@/components/ui/button";
import { useAuth } from "@clerk/nextjs";
import { ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import AllBooking from "./AllBooking";
import Link from "next/link";

const Booking = () => {
  const { userId } = useAuth();
  const router = useRouter();

  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  return (
    <div className="max-w-7xl mx-auto px-4 pt-6 pb-8">
      {/* Header */}
      <div className="mb-8 flex justify-between items-center">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm"
          onClick={() => router.push("/")}
        >
          <ArrowLeft />
        </Button>
        <h1 className="text-lg font-semibold text-gray-700">My Bookings</h1>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full bg-white shadow-sm invisible"
        >
          <ArrowLeft />
        </Button>
      </div>
      <div className="">
        <div className="flex justify-evenly items-center mb-6">
          <Link
            href="?type=upcoming"
            className={
              type === "upcoming"
                ? "text-yellow-600 font-semibold underline underline-offset-8"
                : "font-semibold"
            }
          >
            Upcoming
          </Link>
          <Link
            href="?type=completed"
            className={
              type === "completed"
                ? "text-yellow-600 font-semibold underline underline-offset-8"
                : "font-semibold"
            }
          >
            Completed
          </Link>
          <Link
            href="?type=cancelled"
            className={
              type === "cancelled"
                ? "text-yellow-600 font-semibold underline underline-offset-8"
                : "font-semibold"
            }
          >
            Cancelled
          </Link>
        </div>
        <AllBooking userId={userId} type={type} />
      </div>
    </div>
  );
};

export default Booking;
