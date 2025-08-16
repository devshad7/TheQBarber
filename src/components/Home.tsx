"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAuth, useUser } from "@clerk/nextjs";
import { Roles } from "@/types/globals";
import DashboardBarber from "./DashboardBarber";
import DashboardUser from "./DashboardUser";
import Navbar from "./layout/Navbar";
import NavbarTwo from "./layout/NavbarTwo";
import Footer from "./layout/Footer";

const Home = () => {
  const { isSignedIn, isLoaded, sessionClaims } = useAuth();

  if (!isLoaded) {
    return <LoadingSpinner />;
  }
  if (!isSignedIn) {
    return <HomeSplash />;
  }

  const role = sessionClaims?.metadata?.role as Roles | undefined;

  if (role === "barber") {
    return <BarberDashboard />;
  }
  if (role === "user") {
    return <UserDashboard />;
  }
};

export default Home;

const HomeSplash = () => {
  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="flex flex-col items-center gap-10">
        <Image
          src="/assets/barber.svg"
          alt="Barber Image"
          width={300}
          height={200}
          className="rounded-lg"
        />
        <div className="flex flex-col items-center">
          <h2 className="text-balance text-center text-xl font-bold">
            Skip the Wait <br /> Book Your Barbershop Spot!
          </h2>
          <div className="mt-6 flex flex-col gap-2 w-full">
            <Link href={"/auth/sign-in?user"}>
              <Button className="w-full py-5">Join a Queue</Button>
            </Link>
            <Link href={"/auth/sign-in?barber"}>
              <Button className="w-full py-5" variant={"secondary"}>
                Continue as a Barber <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

const BarberDashboard = () => {
  return (
    <>
      <NavbarTwo />
      <DashboardBarber />
    </>
  );
};

const UserDashboard = () => {
  return (
    <>
      <Navbar />
      <DashboardUser />
      <Footer />
    </>
  );
};

const LoadingSpinner = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <Loader2 className="animate-spin" />
    </div>
  );
};
